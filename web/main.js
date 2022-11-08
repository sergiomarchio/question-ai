function go() {
    console.log(inputQuestion.value);

    get_topic(inputQuestion.value, (v) => {
        topicResponse.textContent = JSON.stringify(v, null, 2);
    });

    inputQuestion.value = "";
    inputQuestion.focus();
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


const topicURL = "http://localhost:8000/topic?"

const buttonGo = document.querySelector("button#go");
const inputQuestion = document.querySelector("input#question");
const topicResponse = document.querySelector("#topic-response");
const topicLink = document.querySelector("#topic-link");


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
