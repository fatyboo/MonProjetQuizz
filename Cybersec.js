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
      question: "La « triade de la CIA » appelée également « AIC » comprend les principes clés de la sécurité de l'information :",
      answers: [
        { text: ' Confidentialité Intégrité Disponibilité', correct: true },
        { text: 'Confidentialité Intégre Disponibilité', correct: false },
        { text: 'Confidentialité Intégrité Disponible', correct: false },
        { text: 'Confidentiel Intégrité Disponibilité', correct: false }
      ]
    },
    {
      question: "Modèle d'OSI",
      answers: [
        { text: "Un protocole réseau est un ensemble établi de règles qui déterminent la manière dont les données sont transmises entre différents dispositifs dans deux réseaux différents",  correct: false },
        { text: "Un protocole réseau est un ensemble établi de règles qui déterminent la manière dont les packets sont transmises entre différents dispositifs dans un même réseau", correct: false },
        { text: "Un protocole réseau est un ensemble établi de règles qui déterminent la manière dont les données sont transmises entre meme dispositifs dans un même réseau.", correct: false },
        { text: "Un protocole réseau est un ensemble établi de règles qui déterminent la manière dont les données sont transmises entre différents dispositifs dans un même réseau", correct: true }
      ]
    },
    {
      question: "Modéle OSI",
      answers: [
        { text: "Modèle d'Interconnexion des Systèmes Ouverts", correct: true },
        { text: "Modèle d'Internet des Systèmes Ouverts", correct: false },
        { text: "Module d'Interconnexion des Systèmes Ouverts", correct: false },
        { text: "Modèle d'Interconnexion des Systèmes Outres", correct: false }
      ]
    },
    {
      question: "Le modèle TCP/IP est une version concise du modèle OSI. Il contient quatre couches, contrairement à sept couches du modèle OSI",
      answers: [
        { text: "Procédé/couche d'application", correct: false },
        { text: 'Hôte-à-hôte/couche de transport', correct: false },
        { text: 'Toutes les réponses', correct: true },
        { text: 'Couche Internet', correct: false }
      ]
    },
    {
      question: "Le Pare-feu",
      answers: [
        { text: 'Un pare-feu est un dispositif de sécurité réseau qui surveille le trafic réseau et sortant et permet ou bloque des paquets de données basés sur un ensemble de règles de sécurité.', correct: false },
        { text: 'Un pare-feu est un dispositif de sécurité réseau qui surveille le trafic réseau entrant et permet ou bloque des paquets de données basés sur un ensemble de règles de sécurité.', correct: false },
        { text: 'Un pare-feu est un dispositif de sécurité réseau qui surveille le trafic réseau entrant et sortant et permet ou bloque des paquets de données basés sur un ensemble de règles de sécurité.', correct: true },
        { text: 'Un pare-feu est un dispositif de sécurité réseau qui surveille le trafic réseau entrant et sortant et permet et débloque des paquets de données basés sur un ensemble de règles de sécurité.', correct: false }
      ]
    },
      {question: "Définition de l'IDS",
      answers: [
        { text: "Network Intrusion Detection Systems (IDS) défent le comportement du système et l'alerte sur le trafic réseau potentiellement malveillant", correct: false },
        { text: "Network Intrusion Detection Systems (IDS) surveille le comportement du système et débloque le trafic réseau potentiellement malveillant", correct: false },
        { text: "Network Intrusion Detection Systems (IDS) surveille le comportement du système et l'alerte sur le trafic réseau potentiellement malveillant", correct: true },
        { text: "Network Intrusion Detection Systems (IDS) désertele comportement du système et l'alerte sur le trafic réseau potentiellement malveillant", correct: false }
      ]
    },
    {question: "Définition de l'IPS",
      answers: [
        { text: "Un IPS est un système de sécurité réseau conçu pour contre-tenir une activité malveillante au sein d'un réseau.", correct: false },
        { text: "Un IPS est un système de sécurité réseau conçu pour déclencher une activité malveillante au sein d'un réseau.", correct: false },
        { text: "Un IPS est un système de sécurité réseau conçu pour créer une activité malveillante au sein d'un réseau.", correct: true },
        { text: "Un IPS est un système de sécurité réseau conçu pour empêcher une activité malveillante au sein d'un réseau.", correct: false }
      ]
    },
    {question: "Qu'est ce que le Chiffrement de données",
      answers: [
        { text: 'Le chiffrement des données est une façon de traduire des données du texte brut en texte chiffré (chiffrement) ', correct: true },
        { text: 'Le chiffrement des données est une façon de traduire des données du texte chiffré en texte brut ', correct: false },
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
  
