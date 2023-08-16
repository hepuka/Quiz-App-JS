const database = [
  {
    question: "Mi Tatita néninek a kedvenc színe?",
    answers: [
      { text: "Türkiz", correct: false },
      { text: "Rózsaszín", correct: true },
      { text: "Piros", correct: false },
      { text: "Lila", correct: false },
    ],
  },
  {
    question: "Mit szeret Muttymurutty csinálni?",
    answers: [
      { text: "PS-ezni", correct: true },
      { text: "Vásárolni", correct: false },
      { text: "Tanulni", correct: false },
      { text: "Olvasni", correct: false },
    ],
  },
  {
    question: "Ki szokott fürödni a legtöbb vízben?",
    answers: [
      { text: "Anya", correct: false },
      { text: "Peti", correct: false },
      { text: "Panka", correct: false },
      { text: "Hépu", correct: true },
    ],
  },
  {
    question: "Megyünk szombaton a fűrdőbe?",
    answers: [
      { text: "Talán", correct: false },
      { text: "IGEEEEEEEEEN", correct: true },
      { text: "Meglehet", correct: false },
      { text: "Nemhinném", correct: false },
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
  let currentQuestion = database[currentQuestionIndex];
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
  questionElement.innerHTML = `${score} pontot értél el a ${database.length}-ból!`;
  nextButton.innerHTML = "Új játék";
  nextButton.style.display = "block";
};

const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < database.length) {
    showQuestion();
  } else {
    showScore();
  }
};

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < database.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
