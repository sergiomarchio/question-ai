function clear() {
    inputQuestion.value = "";
    hideClearButton();
}

function showClearButton() {
    buttonClear.removeAttribute("hidden");
}

function hideClearButton() {
    buttonClear.setAttribute("hidden", "");
}

function go() {
    console.log(inputQuestion.value);

    getTopic(inputQuestion.value, (v) => {
        topicResponse.textContent = JSON.stringify(v, null, 2);
        topicName.textContent = v["topic-name"];
        topicProb.textContent = "topic-p" in v ? v["topic-p"].toFixed(3) : "";
    });

    topicName.value = "";
}

function getTopic(question, action) {
    fetch(topicURL + new URLSearchParams({question: question}), {
        method: "GET",
    })
        .then(r => r.json()
            .then(j => action(j)))
        .catch(e => console.log(e));

}

function getTopics(action) {
    fetch(topicsURL, {
        method: "GET",
    })
        .then(r => r.json()
            .then(j => action(j)))
        .catch(e => console.log(e));

}

function populateTopics() {
    topicsLinkChange();
    getTopics(v => {
        topicsResponse.textContent = JSON.stringify(v, null, 2);
        topicsNames.textContent = Object.values(v).join(", ");
    });
}

function topicLinkChange() {
    let linkValue = topicURL + "question=" + inputQuestion.value;
    topicLink.textContent = linkValue;
    topicLink.setAttribute("href", linkValue);
}

function topicsLinkChange() {
    let linkValue = topicsURL;
    topicsLink.textContent = linkValue;
    topicsLink.setAttribute("href", linkValue);
}


const baseURL = "https://question-ai.api.serg.ink"
const topicURL = baseURL + "/topic?"
const topicsURL = baseURL + "/topics"

const inputQuestion = document.querySelector("input#question");
const buttonClear = document.querySelector("button#clear");
const buttonGo = document.querySelector("button#go");
const topicName = document.querySelector("#topic-name");
const topicProb = document.querySelector("#topic-p");
const topicsNames = document.querySelector("#topics-names");
const topicLink = document.querySelector("#topic-link");
const topicsLink = document.querySelector("#topics-link");
const topicResponse = document.querySelector("#topic-response");
const topicsResponse = document.querySelector("#topics-response");


buttonClear.addEventListener("click", clear);

buttonGo.addEventListener("click", go);

inputQuestion.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        go();
    } else {
        if (inputQuestion.value === "") {
            hideClearButton();
        } else {
            showClearButton();
        }
        topicLinkChange();
    }
});


window.onload = function () {
    populateTopics();
    inputQuestion.focus();
    topicLinkChange();
}
