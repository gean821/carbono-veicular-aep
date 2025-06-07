// Armazena a pontuação total
let totalCO2 = 0;

// Armazena a etapa atual
let currentStep = 0;

// Perguntas e opções
const questions = [
    {
        question: "Como você vai para o trabalho hoje?",
        options: [
            { text: "Carro sozinho", value: 0.25 },
            { text: "Ônibus", value: 0.1 },
            { text: "Bicicleta", value: 0 },
            { text: "Caminhada", value: 0 },
            { text: "Carona", value: 0.12 },
        ],
        type: "transporte",
        unit: "kg/km"
    },
    {
        question: "O que você comeu no almoço?",
        options: [
            { text: "Churrasco", value: 2.5 },
            { text: "Comida vegetariana", value: 1.0 },
            { text: "Comida vegana", value: 0.5 },
        ],
        type: "alimentacao",
        unit: "kg"
    },

    {
        question: "Você desligou as luzes ao sair?",
        options: [
            { text: "Sim", value: 0 },
            { text: "Não", value: 0.2 },
        ],
        type: "energia",
        unit: "kg"
    },
    {
        question: "Você comprou algo hoje?",
        options: [
            { text: "Sim, eletrônico novo", value: 5 },
            { text: "Sim, roupa", value: 2 },
            { text: "Não comprei nada", value: 0 },
        ],
        type: "consumo",
        unit: "kg"
    },
    {
        question: "Você separa o lixo reciclável?",
        options: [
            { text: "Sim", value: 0 },
            { text: "Não", value: 1 },
        ],
        type: "residuos",
        unit: "kg"
    }
];

function IniciarTeste() {
    document.querySelector("main").innerHTML = "";
    showQuestion();
}

function MostrarPerguntaUser() {
    const container = document.querySelector("main");
    container.innerHTML = "";

    if (currentStep >= questions.length) {
        showResult();
        return;
    }

    const q = questions[currentStep];

    const questionElement = document.createElement("h2");
    questionElement.textContent = q.question;
    container.appendChild(questionElement);

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.text;
        btn.addEventListener("click", () => {
            totalCO2 += option.value;
            currentStep++;
            showQuestion();
        });
        container.appendChild(btn);
    });
}

function MostrarResultado() {
    const container = document.querySelector("main");
    container.innerHTML = `
        <h2>Você emitiu aproximadamente ${totalCO2.toFixed(2)} kg de CO₂ hoje.</h2>
        <p>${GerarFeedback(totalCO2)}</p>
        <button onclick="reset()">Refazer teste</button>
    `;
}

function GerarFeedback(total) {
    if (total < 2) return "Excelente! Sua pegada de carbono está abaixo da média recomendada.";
    if (total < 5) return "Bom! Mas ainda há espaço para reduzir um pouco mais suas emissões.";
    return "Alerta! Suas escolhas estão resultando em uma alta emissão de CO₂.";
}

function Refazer() {
    totalCO2 = 0;
    currentStep = 0;
    iniciarTeste();
}

document.querySelector(".StartQuestionaryButton button").addEventListener("click", iniciarTeste);
