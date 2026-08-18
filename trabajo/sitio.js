const preguntas = [
  {
    pregunta: "¿Qué lenguaje se utiliza para dar estilo a una página web?",
    opciones: ["HTML", "CSS", "JavaScript", "PHP"],
    correcta: 1
  },
  {
    pregunta: "¿Qué significa DOM en desarrollo web?",
    opciones: [
      "Document Object Model",
      "Data Output Module",
      "Dynamic Organization Method",
      "Design Online Manager"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Para qué sirve JavaScript principalmente?",
    opciones: [
      "Para estructurar páginas",
      "Para almacenar datos en servidores",
      "Para agregar interactividad",
      "Para dar formato visual "
    ],
    correcta: 2
  },
  {
    pregunta: "¿Cuál de estas es una estructura condicional en JavaScript?",
    opciones: ["let", "if", "function", "class"],
    correcta: 1
  }
];

let indicePregunta = 0;
let correctas = 0;
let incorrectas = 0;


const screenStart = document.getElementById("screen-start");
const screenQuiz = document.getElementById("screen-quiz");
const screenEnd = document.getElementById("screen-end");

const btnStart = document.getElementById("btn-start");
const btnNext = document.getElementById("btn-next");

const questionTitle = document.getElementById("question-title");
const progress = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");

const correctEl = document.getElementById("correct");
const incorrectEl = document.getElementById("incorrect");
const scoreEl = document.getElementById("score");

let opcionSeleccionada = null;

function showScreen(screen) {
  screenStart.classList.add("hidden");
  screenQuiz.classList.add("hidden");
  screenEnd.classList.add("hidden");

  if (screen === "start") screenStart.classList.remove("hidden");
  if (screen === "quiz") screenQuiz.classList.remove("hidden");
  if (screen === "end") screenEnd.classList.remove("hidden");
}

function renderQuestion() {
  const q = preguntas[indicePregunta];

  opcionSeleccionada = null;
  btnNext.disabled = true;

  questionTitle.textContent = `Pregunta ${indicePregunta + 1}`;
  progress.textContent = `${indicePregunta + 1} / ${preguntas.length}`;
  questionText.textContent = q.pregunta;

  optionsContainer.innerHTML = "";

  q.opciones.forEach((opcion, index) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opcion;

    div.addEventListener("click", () => {
      const options = document.querySelectorAll(".option");
      options.forEach(opt => {
        opt.style.pointerEvents = "none";
        opt.classList.remove("selected");
      });

      opcionSeleccionada = index;

      if (index === q.correcta) {
        div.classList.add("correct");
        correctas++;
      } else {
        div.classList.add("incorrect");
        incorrectas++;
        options[q.correcta].classList.add("correct");
      }

      btnNext.disabled = false;
    });

    optionsContainer.appendChild(div);
  });
}

function nextQuestion() {
  indicePregunta++;

  if (indicePregunta < preguntas.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const total = preguntas.length;
  const puntaje = Math.round((correctas / total) * 100);

  correctEl.textContent = correctas;
  incorrectEl.textContent = incorrectas;
  scoreEl.textContent = `${puntaje}%`;

  showScreen("end");
}

function restartQuiz() {
  indicePregunta = 0;
  correctas = 0;
  incorrectas = 0;

  showScreen("start");
}

btnStart.addEventListener("click", () => {
  showScreen("quiz");
  renderQuestion();
});

btnNext.addEventListener("click", nextQuestion);

document.getElementById("btn-restart").addEventListener("click", restartQuiz);