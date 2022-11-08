from pathlib import Path
import yaml


class __Config:
    @property
    def config(self):
        with open("config.yml", 'r') as f:
            return yaml.safe_load(f)

    @property
    def lda_folder(self):
        return self.config['lda-folder']

    @property
    def lda_filename(self):
        return self.config['lda-filename']

    @property
    def lda_fullpath(self):
        return str(Path(self.lda_folder, self.lda_filename))

    @property
    def topics(self):
        return self.config['topic-names']


config = __Config()
