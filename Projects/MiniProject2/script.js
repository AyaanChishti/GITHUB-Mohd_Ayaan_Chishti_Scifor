const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreScreen = document.getElementById("score-screen");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

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
    options: ["France","Germany","Brazil","Argentina"],
    answer: "France",
  }
];

let currentQuestion = 0;
let score = 0;

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

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(option));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }

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
