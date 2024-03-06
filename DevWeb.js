const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultsContainer = document.getElementById('results');
const scoreText = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  resultsContainer.classList.add('hide');
  questionContainer.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  if (correct) {
    score++;
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    showResults();
  }
}

function showResults() {
  questionContainer.classList.add('hide');
  resultsContainer.classList.remove('hide');
  scoreText.innerText = score;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
const questions = [
  {
    question: "Quel langage de programmation est principalement utilisé pour styliser et mettre en forme le contenu d'un site web?",
    answers: [
      { text: 'CSS', correct: true },
      { text: 'HTML', correct: false },
      { text: 'JAVASCRIPT', correct: false },
      { text: 'PHP', correct: false }
    ]
  },
  {
    question: "Quelle est la principale différence entre le développement frontend et backend?",
    answers: [
      { text: "Frontend concerne les interactions utilisateur, tandis que le backend gère les aspects visuels du site.",  correct: false },
      { text: "Frontend gère les bases de données, tandis que le backend gère l'interface utilisateur.", correct: false },
      { text: "Frontend concerne l'expérience utilisateur, tandis que le backend concerne la logique et le traitement des données.", correct: false },
      { text: "Frontend concerne l'expérience utilisateur, tandis que le backend concerne la logique et le traitement des données.", correct: true }
    ]
  },
  {
    question: "Que signifie CSS?",
    answers: [
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'Cascading Sheets Style', correct: false },
      { text: 'Cascade shooting style', correct: false },
      { text: 'Cascading Shooting Sheet', correct: false }
    ]
  },
  {
    question: "Qu'est-ce que Git?",
    answers: [
      { text: 'Git est un système de gestion de contenu (VSC : Version system control ) conçu pour gérer rapidement et efficacement tous les projets, des plus petits aux grands.', correct: false },
      { text: 'Git est un système de gestion de contenu (VCS : Version control system) payant, conçu pour gérer rapidement et efficacement tous les projets, des plus petits aux grands.', correct: false },
      { text: 'Git est un système de gestion de contenu (VCS : Version control system) libre et gratuit, conçu pour gérer rapidement et efficacement tous les projets, des plus petits aux grands.', correct: true },
      { text: 'Git est un système de gestion de contenu (VCS : Visit control system) libre et gratuit, conçu pour gérer rapidement et efficacement tous les projets, des plus petits aux grands.', correct: false }
    ]
  },
  {
    question: "Quelle commande permert de vérifier l'état de votre dépôt",
    answers: [
      { text: 'git statuse', correct: false },
      { text: 'git statue', correct: false },
      { text: 'git status', correct: true },
      { text: 'git statuts', correct: false }
    ]
  },
    {question: "La commande git rm permet:",
    answers: [
      { text: 'De modifier des fichiers', correct: false },
      { text: 'De partager des fichiers', correct: false },
      { text: 'De supprimer des fichiers', correct: true },
      { text: "D'ajouter des fichiers", correct: false }
    ]
  },
  {question: "A quoi sert la balise <i></i>",
    answers: [
      { text: 'Permet de mettre en gras le texte', correct: false },
      { text: 'Permet de tracer le texte', correct: false },
      { text: 'Permet de mettre le texte en Italique', correct: true },
      { text: "Permet de souligner le texte", correct: false }
    ]
  },
  {question: "Comment faire un commentaire sur HTML",
    answers: [
      { text: '<!-- Disc bullets --/>', correct: false },
      { text: '!-- Disc bullets --', correct: false },
      { text: '<!-- Disc bullets -->', correct: true },
      { text: "<-- Disc bullets -->", correct: false }
    ]
  },
];
