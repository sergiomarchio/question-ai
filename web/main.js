function go() {
    console.log(inputQuestion.value);

    get_topic(inputQuestion.value, (v) => {
        topicResponse.textContent = JSON.stringify(v, null, 2);
        topicName.textContent = v["topic-name"];
    });

    inputQuestion.value = "";
    topicName.value = "";
}

function get_topic(question, action) {
    fetch(topicURL + new URLSearchParams({question: question}), {
        method: "GET",
    })
        .then(r => r.json()
            .then(j => action(j)))
        .catch(e => console.log(e));

}

function topicLinkChange() {
    let linkValue = topicURL + "question=" + inputQuestion.value;
    topicLink.textContent = linkValue;
    topicLink.setAttribute("href", linkValue);
}


const topicURL = "https://question-ai.api.serg.ink/topic?"

const inputQuestion = document.querySelector("input#question");
const buttonGo = document.querySelector("button#go");
const topicName = document.querySelector("#topic-name");
const topicLink = document.querySelector("#topic-link");
const topicResponse = document.querySelector("#topic-response");


buttonGo.addEventListener("click", go);
inputQuestion.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        go();
    } else {
        topicLinkChange();
    }
});


window.onload = function () {
    inputQuestion.focus();
    topicLinkChange();
}
