from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from topic import topic_lda


app = FastAPI()

origins = [
    "https://question-ai.api.serg.ink",
    "https://question-ai.serg.ink",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credentials=True,
    # allow_methods=["*"],
    # allow_headers=["*"],
)


@app.get("/topic")
def topic(question=None):

    if not question:
        return {"error": "Please specify a question"}

    topic_id, topic_name, topic_p = topic_lda.get_topic(question)
    
    return {
        "question": question,
        "topic-id": topic_id,
        "topic-name": topic_name,
        "topic-p": topic_p
    }


@app.get("/topics")
def topics():

    return topic_lda.topics
