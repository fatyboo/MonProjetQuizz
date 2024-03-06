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
      question: "Qu'est-ce que la data science ?",
      answers: [
        { text: 'Une discipline interdisciplinaire qui utilise des méthodes scientifiques, des algorithmes et des systèmes pour extraire des connaissances à partir de données', correct: true },
        { text: "L'étude des sciences de la terre", correct: false },
        { text: "L'étude des comportements humains", correct: false },
        { text: 'La physique quantique', correct: false }
      ]
    },
    {
      question: "Quelle est la différence entre l'apprentissage supervisé et l'apprentissage non supervisé en data science ?",
      answers: [
        { text: "L'apprentissage supervisé implique l'utilisation de données non étiquetées, tandis que l'apprentissage non supervisé utilise des données étiquetées.",  correct: false },
        { text: ") L'apprentissage supervisé utilise des données étiquetées pour entraîner un modèle à prédire des résultats spécifiques, tandis que l'apprentissage non supervisé découvre des modèles intrinsèques dans les données sans données étiquetées.", correct: false },
        { text: "Un protocole réseau est un ensemble établi de règles qui déterminent la manière dont les données sont transmises entre meme dispositifs dans un même réseau.", correct: false },
        { text: "L'apprentissage supervisé utilise des données étiquetées pour entraîner un modèle à prédire des résultats spécifiques, tandis que l'apprentissage non supervisé découvre des modèles intrinsèques dans les données sans données étiquetées", correct: true }
      ]
    },
    {
      question: "Qu'est-ce que la validation croisée (cross-validation) en data science ?",
      answers: [
        { text: "Une technique utilisée pour évaluer la performance des modèles de prédiction.", correct: true },
        { text: "Une méthode pour diviser les données en ensembles d'entraînement et de test.", correct: false },
        { text: "Un processus pour nettoyer les données.", correct: false },
        { text: "Un algorithme d'apprentissage automatique.", correct: false }
      ]
    },
    {
      question: "Qu'est-ce que la régression linéaire ?",
      answers: [
        { text: "Un algorithme de classification en machine learning.", correct: false },
        { text: "Une méthode utilisée pour résoudre les problèmes de clustering.", correct: false },
        { text: "Une technique d'analyse statistique utilisée pour modéliser la relation entre une variable dépendante continue et une ou plusieurs variables indépendantes.", correct: true },
        { text: "Une méthode pour coder des variables catégorielles", correct: false }
      ]
    },
    {
      question: "Qu'est-ce que l'overfitting en apprentissage automatique ?",
      answers: [
        { text: "Une méthode pour éviter le surajustement des données.", correct: false },
        { text: "Un terme utilisé pour décrire un modèle sous-performant.", correct: false },
        { text: "Une situation où un modèle apprend à partir du bruit dans les données plutôt que des modèles sous-jacents.", correct: true },
        { text: "Un processus pour entraîner un modèle sur des données bruitées.", correct: false }
      ]
    },
      {question: "Qu'est-ce que la méthode du coude (elbow method) ?",
      answers: [
        { text: "Un algorithme d'apprentissage automatique pour la classification.", correct: false },
        { text: "Une technique utilisée pour évaluer la performance des modèles en data science.", correct: false },
        { text: "Une méthode pour déterminer le nombre optimal de clusters dans un algorithme de clustering.", correct: true },
        { text: "Une technique pour nettoyer les données.", correct: false }
      ]
    },
    {question: "Qu'est-ce que la précision (accuracy) dans le contexte de la classification en machine learning ?",
      answers: [
        { text: "La proportion de faux positifs par rapport à tous les exemples positifs.", correct: false },
        { text: "Le nombre de fois où un modèle prédit correctement une classe spécifique.", correct: false },
        { text: "La proportion d'observations correctement classées par un modèle de classification.", correct: true },
        { text: "Une mesure de la capacité d'un modèle à généraliser à de nouvelles données..", correct: false }
      ]
    },
    {question: "Quelle est la différence entre la science des données et l’apprentissage automatique ?",
      answers: [
        { text: "Sciences des données est une combinaison d'algorithmes, d'outils et de techniques d'apprentissage automatique qui vous aide à trouver des modèles cachés communs à partir des données brutes fournies. Alors que l’apprentissage automatique est une branche de l’informatique", correct: true },
        { text: "Sciences des données est un programme, d'outils et de techniques d'apprentissage automatique qui vous aide à trouver des modèles cachés communs à partir des données brutes fournies. Alors que l’apprentissage automatique est une branche de l’informatique", correct: false },
        { text: 'Le chiffrement des données est une façon de traduire des données en texte brut', correct: false },
        { text: "Le chiffrement des données est une façon de traduire des données du texte en texte non chiffré", correct: false }
      ]
    },
    {question: "Comment définit-on le Chiffrement asymétrique",
      answers: [
        { text: 'le chiffrement asymétrique utilise une paire de clés – une clé privée – pour chiffrer les données et une clé public pour déchiffrer les informations', correct: false },
        { text: 'le chiffrement asymétrique utilise une clé privée pour déchiffrer les informations ', correct: false },
        { text: 'le chiffrement asymétrique utilise une paire de clés publique pour chiffrer et déchiffrer les informations', correct: false },
        { text: "le chiffrement asymétrique utilise une paire de clés – une clé publique – pour chiffrer les données et une clé privée pour déchiffrer les informations", correct: true }
      ]
    },
    {question: "Différence entre DES et AES",
    answers: [
      { text: 'La différence clé entre DES et AES est que dans le bloc de texte en clair est divisé en deux moitiés avant que l’algorithme principal commence, alors que, dans DES, le bloc entier est traité pour obtenir le texte chiffré.', correct: false },
      { text: 'La différence clé entre DES et AES est que dans le bloc de texte en clair est divisé en deux moitiés avant que l’algorithme principal commence, alors que, dans AES, le bloc entier est traité pour obtenir le texte chiffré.', correct: true},
      { text: 'La différence clé entre DES et AES est que dans le bloc de texte en clair est divisé en deux moitiés avant que l’algorithme principal commence, alors que, dans AES, le bloc entier est traité pour obtenir le texte déchiffré.', correct: false },
      { text: "La différence clé entre DES et AES est que dans le bloc de texte en clair est divisé en moitiés avant que l’algorithme principal commence, alors que, dans AES, le bloc entier est traité pour obtenir le texte chiffré.", correct:false }
    ]
  },
  ];
  
