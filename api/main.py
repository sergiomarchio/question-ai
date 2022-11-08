from fastapi import FastAPI

from topic import topic_lda

app = FastAPI()


@app.get("/topic")
def topic(question=None):

    if not question:
        return {"error": "Please specify a question"}

    topic_id, topic_name = topic_lda.get_topic(question)
    return {
        "question": question,
        "topic-id": topic_id,
        "topic-name": topic_name
    }
