const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreScreen = document.getElementById("score-screen");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const timerEl = document.getElementById("time");

const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Lucknow", "Delhi", "Noida"],
    answer: "Delhi",
  },
  {
    question: "Which is the National animal of India?",
    options: ["Lion", "Tiger", "Wolf", "Goat"],
    answer: "Tiger",
  },
  {
    question: "Who is the fastest bowler in the World?",
    options: ["Shaun Tait", "Shane Bond", "Wasim Akram", "Shoaib Akhtar"],
    answer: "Shoaib Akhtar",
  },
  {
    question: "Who won the Fifa World Cup in 2018?",
    options: ["France", "Germany", "Brazil", "Argentina"],
    answer: "France",
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startBtn.classList.add("hide");
  scoreScreen.classList.add("hide");
  quizBox.classList.remove("hide");
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      disableOptions();
      nextQuestion();
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectAnswer(btn, option));
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(button, selected) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn === button && selected !== correct) {
      btn.classList.add("wrong");
    }
  });

  if (selected === correct) score++;

  setTimeout(nextQuestion, 1000);
}

function disableOptions() {
  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    }
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizBox.classList.add("hide");
  scoreScreen.classList.remove("hide");
  scoreText.textContent = `${score} / ${questions.length}`;
}
