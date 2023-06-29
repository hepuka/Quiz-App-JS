const questions = [
  {
    question: "Mi a gyerekek és HÉPU kedvenc étele?",
    answers: [
      { text: "Cápaleves", correct: false },
      { text: "Smart leves", correct: true },
      { text: "Bableves", correct: false },
      { text: "Káposztaleves", correct: false },
    ],
  },
  {
    question: "Mi Katika kedvenc boltja?",
    answers: [
      { text: "Crystal Nails", correct: true },
      { text: "Rossmann", correct: false },
      { text: "Auchan", correct: false },
      { text: "Tesco", correct: false },
    ],
  },
  {
    question: "Petike holnap összetudja rakni a számítógépet?",
    answers: [
      { text: "Nem", correct: false },
      { text: "Talán", correct: false },
      { text: "Dehogy tudja", correct: false },
      { text: "Igen", correct: true },
    ],
  },
  {
    question: "Milyen ruhát vett Panka utoljára?",
    answers: [
      { text: "Bugyi", correct: false },
      { text: "Fürdőruha", correct: true },
      { text: "Póló", correct: false },
      { text: "Melltartó", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Következő";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

const resetState = () => {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
};

const selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
};

const showScore = () => {
  resetState();
  questionElement.innerHTML = `${score} pontot értél el a ${questions.length}-ból!`;
  nextButton.innerHTML = "Új játék";
  nextButton.style.display = "block";
};

const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
