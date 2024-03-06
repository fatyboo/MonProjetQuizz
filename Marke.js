const quizData = [
    {
        question: "Qu'est ce que le SEO (Search Engine Optimization)?",
        answers: [
          { text: "Une méthode pour augmenter le trafic sur un site web en utilisant des publicités payantes",  correct: false },
          { text: "Une stratégie pur réduireles coùts publicitaires en lignes.", correct: false },
          { text: "La création de contenu visuel attrayant pour les réseaux sociaux.", correct: false },
          { text: "Une technique visnt à améliorer le classement sun site web dans les résultats des moteurs de recherche", correct: true }
        ]
      },
    {
        question: "Quel est le symbole chimique de l'eau ?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        answer: "H2O"
    },
    {
        question: "Quel est le plus grand océan du monde ?",
        options: ["Océan Atlantique", "Océan Pacifique", "Océan Indien", "Océan Arctique"],
        answer: "Océan Pacifique"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

    optionsElement.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(option) {
    const question = quizData[currentQuestion];
    if (option === question.answer) {
        score++;
        resultElement.innerText = 'Bonne réponse!';
    } else {
        resultElement.innerText = 'Mauvaise réponse. La bonne réponse est ' + question.answer;
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        resultElement.innerText = '';
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.innerText = '';
    optionsElement.innerHTML = '';
    resultElement.innerText = 'Fin du quiz. Votre score est de ' + score + '/' + quizData.length;
}
