let welcomeScreen = document.querySelector(".welcome")
let quizScreen = document.querySelector(".quiz")
let resultScreen = document.querySelector(".result")
let startQuizBtn = document.querySelector(".start-quiz-btn")
let answerBtns = document.querySelectorAll(".answer")
let restartQuizBtn = document.querySelector(".restart-quiz-btn")

let quizMessage = document.querySelector(".quiz_message")

let quizQuestion = document.querySelector(".quiz_question")
let resultTitle = document.querySelector(".result_title")
let quizCounter = document.querySelector(".quiz_counter span")

let timerElement = document.querySelector(".timer")
let interval
let startTimerValue = 15

function startTimer() {
    timerElement.innerHTML = startTimerValue

    interval = setInterval(function () {
        if (startTimerValue == 1) {
            timerElement.innerHTML = 0
            clearInterval(interval)
            showQuestionResult("#c60c0cb0")
            showNextQuestion()
        } else {
            startTimerValue--
            timerElement.innerHTML = startTimerValue
        }
    }, 1000)
}

let allQuestion = [
    { 
        question: "Хто лідер гурту?",
        answers: ["Перрін", "Коул", "Клемі", "Кінґслі"],
        correctAnswer: "Коул",
        msg: "*Кінґслі впевнено вказує на себе великими пальцями*"
    },
    {
        question: "Хто такі Слухачі?",
        answers: ["Раса", "Співаки", "Боги", "Злі духи"],
        correctAnswer: "Боги",
        msg: "*Гості в театрі перешіптуються*"
    },
    {
        question: "Скільки Богів згадуються в балладі?",
        answers: ["5", "8", "3", "4"],
        correctAnswer: "4",
        msg: "Підказка: 8-2+1-43+24-12+35-7"
    },
    {
        question: "Які Боги одружені?",
        answers: ["Дзвонар та Розпалювач", "Оповідач та Дзвонар", "Король птахів та Оповідач ", "Всі холостяки"],
        correctAnswer: "Оповідач та Дзвонар",
        msg: "*Клемі із лякаючою посмішкою дивиться на тебе*"
    },
    {
        question: "Маска Кінґслі це...",
        answers: ["Дерево", "Кабанчик", "Єнот", "Невідомо"],
        correctAnswer: "Дерево",
        msg: "Всі з нетерпінням чекають твоєї відповіді"
    },
    {
        question: "Хто з гурту грає на гіталеле?",
        answers: ["Перрін", "Коул", "Клемі", "Кінґслі"],
        correctAnswer: "Коул",
        msg: "Гіталеле - струнний інструмент, що розміром трохи менший за гітару, але звук нагадує укулеле."
    },
    {
        question: "Хто з гурту найвищий?",
        answers: ["Перрін", "Коул", "Клемі", "Кінґслі"],
        correctAnswer: "Перрін",
        msg: "Кінґслі заліз на плечі Перріну"
    },
    {
        question: "Хто 'лалалакає' всі пісні?",
        answers: ["Перрін", "Коул", "Клемі", "Кінґслі"],
        correctAnswer: "Клемі",
        msg: "*Клемі ніжно дивиться на Коул, наче чекаючи, що та почне співати*"
    },
    {
        question: "Що зазвичай вимагає Кінґслі?",
        answers: ["Монети", "Жолуді", "Цвіркунів", "Цукерки"],
        correctAnswer: "Цвіркунів",
        msg: "*Кінґслі протягує руку, чекаючи їх від тебе.*"
    },
    {
        question: "Яка найпопулярніша пісня Yaelokre?",
        answers: ["Neath the grove is a heart", "Hartebeest", "And the Hound", "Harpy Hare"],
        correctAnswer: "Harpy Hare",
        msg: "*Коул зітхає, що тут нема їх улюбленої*"
    }
]
let totalQuestions = allQuestion.length

let userPoint = 0
let currQuestionnNumber = 0

let scoreElement = document.querySelector(".score")

function renderQuestion(quest) {
    quizQuestion.innerHTML = quest.question
    answerBtns.forEach((btn, i) => btn.innerHTML = quest.answers[i])
    quizMessage.innerHTML = quest.msg
    startTimer()
}

function showNextQuestion() {
    disabledButton(true)

    startTimerValue = 15

    setTimeout(() => {
        if (currQuestionnNumber == allQuestion.length - 1) {
            finishQuiz()
        } else {
            currQuestionnNumber++
            renderQuestion(allQuestion[currQuestionnNumber])
            quizCounter.innerHTML = currQuestionnNumber + 1
        }
        disabledButton(false)
    }, 800)
}

function showQuestionResult(color) {
    quizScreen.style.background = color
    
    setTimeout(() => {
        quizScreen.style.background = ""
    }, 600)
}

function disabledButton(option) {
    answerBtns.forEach(btn => btn.disabled = option)
}

function runQuiz() {
    deleteActiveScreen()
    quizScreen.classList.add("active")
    currQuestionnNumber = 0
    userPoint = 0
    renderQuestion(allQuestion[currQuestionnNumber])
    quizCounter.innerHTML = currQuestionnNumber + 1
}

function finishQuiz() {
    deleteActiveScreen()
    resultScreen.classList.add("active")

    if (0 <= userPoint && userPoint < 1*totalQuestions/5 ) {
        resultTitle.innerHTML = `Sorry, baby girl, but bissnes is bissnes. `
    } else if (1*totalQuestions/5 <= userPoint && userPoint < 2*totalQuestions/5 ) {
        resultTitle.innerHTML = `Що ж, ти намагався..`
    } else if (2*totalQuestions/5 <= userPoint && userPoint < 3*totalQuestions/5 ) {
        resultTitle.innerHTML = `Якщо ти тицяв на рандомі то Боги тебе благословили на непогану вдачу.`
    } else if (3*totalQuestions/5 <= userPoint && userPoint < 4*totalQuestions/5 ) {
        resultTitle.innerHTML = `Ла-ла-ла-ла~`
    } else {
        resultTitle.innerHTML = `Може приєднаєшся до нашого гурту?..`
    }

    scoreElement.textContent = `${userPoint}/${totalQuestions}`
}

function deleteActiveScreen() {
    welcomeScreen.classList.remove("active")
    quizScreen.classList.remove("active")
    resultScreen.classList.remove("active")
}

startQuizBtn.addEventListener("click", runQuiz)
restartQuizBtn.addEventListener("click", () => {
    userPoint = 0
    scoreElement.textContent = `0/0`
    runQuiz()
})

answerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        clearInterval(interval)

        if (btn.innerHTML == allQuestion[currQuestionnNumber].correctAnswer) {
            userPoint++
            showQuestionResult("#1b921f9f")
        } else {
            showQuestionResult("#c60c0cb0")
        }

        showNextQuestion()
    })
})
