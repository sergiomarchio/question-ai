import nltk
from nltk import word_tokenize
from nltk.corpus import stopwords
import re

from gensim.models import LdaModel

from config import config

nltk.download('punkt')
nltk.download('stopwords')


class MyLDA:
    def __init__(self):
        self.lda_model = None
        self._topic_names = None

    @property
    def topics(self):
        return self._topic_names

    @topics.setter
    def topics(self, topic_names):
        self._topic_names = topic_names

    def load_model(self, file):
        self.lda_model = LdaModel.load(file)

    # preprocessing
    def clean_text(self, text):
        def strip_text(text):
            # TODO: Que filtramos?
            text = text.lower().strip()
            # text = ' '.join(filter(str.isalnum, text))
            return text

        def tokenizer(text):
            # return [w for w in word_tokenize(text) if w.isalpha()] # si solo nos interesan palabras
            return word_tokenize(text)

        def filter_text(text):
            return [
                # Solo caracteres alfanumericos
                re.sub(r"[\W_]+", "", x)
                for x in text
                # Filter stopwords
                if x not in stopwords.words("english")
                   and x not in stopwords.words("spanish")
            ]

        # def get_stop_words():
        #     return stopwords.words("english")
        text = strip_text(text)
        text = tokenizer(text)
        text = filter_text(text)
        return text

    def get_topic(self, text):
        bow = self.lda_model.id2word.doc2bow(self.clean_text(text))
        predicted = self.lda_model[bow]

        print(predicted)

        topic_id, topic_p = max(predicted, key=lambda x: x[1])
        
        return topic_id, self.topics[topic_id], float(topic_p)


topic_lda = MyLDA()
topic_lda.load_model(config.lda_fullpath)
topic_lda.topics = config.topics
