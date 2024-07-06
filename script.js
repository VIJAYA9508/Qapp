let questions = [
    {
        prompt: `Who won the cricket World cup final 2024?
                 
                 `,
        options: [
            "India",
            "South Africa",
            "England",
            "Other",
        ],
        answer: "India",
    },

    {
        prompt: `JAVA stand for?`,
        options: [
            "Just Another Virtual Accelerator",
            "Just Ask Virtual Allow",
            "Just Another Virtual Apply",
            "None",
        ],
        answer: "Just Another Virtual Accelerator",
    },

    {
        prompt: `Which is Correct?`,
        options: [
            "JVM stand for JAVA Virtual Machine",
            "JRE stand for JAVA Runtime Environment",
            "CSS Stand for Cascading Style Sheet",
            "All",
        ],
        answer: "All",
    },

    {
        prompt: `Who is prime minister of India in 2024?`,
        options: [
            "Nitish Kumar",
            "Shri Narendra Modi",
            "Rahul Kumar",
            "pta nhi"
        ],
        answer: "Shri Narendra Modi",
    },

    {
        prompt: `Who is president of India 2024? `,
        options: [
            "Droupadi Murmu",
            "Partibha Devisingh Patil",
            "Narendra Modi",
            "none",
        ],
        answer: "Droupadi Murmu",
    },
];
let questionsEl =
    document.querySelector(
        "#questions"
    );
let timerEl =document.querySelector("#timer");
let choicesEl =document.querySelector("#options");
let submitBtn = document.querySelector("#submit-score");
let startBtn =document.querySelector("#start");
let nameEl =document.querySelector("#name");
let feedbackEl = document.querySelector("#feedback");
let reStartBtn =document.querySelector("#restart");
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;
function quizStart() {
    timerId = setInterval(
        clockTick,
        1000
    );
    timerEl.textContent = time;
    let landingScreenEl =
        document.getElementById(
            "start-screen"
        );
    landingScreenEl.setAttribute(
        "class",
        "hide"
    );
    questionsEl.removeAttribute(
        "class"
    );
    getQuestion();
}
function getQuestion() {
    let currentQuestion =questions[currentQuestionIndex];
    let promptEl =document.getElementById(
            "question-words"
        );
    promptEl.textContent =currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
        function (choice, i) {
            let choiceBtn =
                document.createElement(
                    "button"
                );
            choiceBtn.setAttribute(
                "value",
                choice
            );
            choiceBtn.textContent =
                i + 1 + ". " + choice;
            choiceBtn.onclick =
                questionClick;
            choicesEl.appendChild(
                choiceBtn
            );
        }
    );
}
function questionClick() {
    if (
        this.value !==
        questions[currentQuestionIndex]
            .answer
    ) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer was 
        ${questions[currentQuestionIndex].answer}.`;
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent ="Correct!";
        feedbackEl.style.color ="green";
    }
    feedbackEl.setAttribute(
        "class",
        "feedback"
    );
    setTimeout(function () {
        feedbackEl.setAttribute(
            "class",
            "feedback hide"
        );
    }, 2000);
    currentQuestionIndex++;
    if (
        currentQuestionIndex ===
        questions.length
    ) {
        quizEnd();
    } else {
        getQuestion();
    }
}
function quizEnd() {
    clearInterval(timerId);
    let endScreenEl =
        document.getElementById(
            "quiz-end"
        );
    endScreenEl.removeAttribute(
        "class"
    );
    let finalScoreEl =
        document.getElementById(
            "score-final"
        );
    finalScoreEl.textContent = time;
    questionsEl.setAttribute(
        "class",
        "hide"
    );
}
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}
function saveMaxmarks() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let Maxmarks =
            JSON.parse(
                window.localStorage.getItem(
                    "Maxmarks"
                )
            ) || [];
        let newScore = {
            score: time,
            name: name,
        };
        Maxmarks.push(newScore);
        window.localStorage.setItem(
            "Maxmarks",
            JSON.stringify(Maxmarks)
        );
        alert(
            "Your Score has been Submitted"
        );
    }
}
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveMaxmarks();
        alert(
            "Your Score has been Submitted"
        );
    }
}
nameEl.onkeyup = checkForEnter;
submitBtn.onclick = saveMaxmarks;
startBtn.onclick = quizStart;