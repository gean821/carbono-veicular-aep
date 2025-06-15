function mostrarPergunta(numero) {
  document.querySelectorAll('.pagina').forEach(p => {
    p.classList.remove('mostrar');
  });

  const idPagina = typeof numero === 'number' ? `pagina${numero}` : numero;
  const pagina = document.getElementById(idPagina);

  if (pagina) {
    setTimeout(() => {
      pagina.classList.add('mostrar');
      pagina.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}

let paginaAtual = 1;
let respostas = {};

document.addEventListener("DOMContentLoaded", () => {
  const primeira = document.getElementById("pagina1");
  if (primeira) {
    setTimeout(() => {
      primeira.classList.add("mostrar");
    }, 100);
  }

  mostrarPergunta(1);

  respostas = {
    transporte: null,
    alimentacao: null,
    energia: null,
    consumo: null,
    residuos: null,
    energia_renovavel: null,
    moradores: null,
    tipo_transporte: null,
    km_semana: null,
    carne: null,
    roupas: null,
    reciclagem: null,
    reutilizacao: null,
    ar_condicionado: null,
    banho: null,
    standby: null,
    viagens_aviao: null,
    desperdicio: null,
    lampadas_led: null,
    compras_online: null
  };

  const totalPaginas = 20;

  document.querySelectorAll(".opcoes button").forEach(botao => {
    botao.addEventListener("click", () => {
      const valor = parseFloat(botao.getAttribute("data-value"));
      const perguntaPai = botao.closest(".opcoes");
      const tipoPergunta = perguntaPai.getAttribute("data-pergunta");

      respostas[tipoPergunta] = valor;
      paginaAtual++;

      if (paginaAtual <= totalPaginas) {
        mostrarPergunta(paginaAtual);
        const paginaElemento = document.getElementById(`pagina${paginaAtual}`);
        if (paginaElemento) {
          paginaElemento.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        mostrarPergunta('resultado-final');
        calcularCO2();
        const paginaResultado = document.getElementById('resultado-final');
        if (paginaResultado) {
          paginaResultado.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

function calcularCO2() {
  const {
    transporte, alimentacao, energia, consumo, residuos,
    energia_renovavel, moradores, tipo_transporte, km_semana,
    carne, roupas, reciclagem, reutilizacao,
    ar_condicionado, banho, standby, viagens_aviao,
    desperdicio, lampadas_led, compras_online
  } = respostas;

  if (Object.values(respostas).some(val => val === null)) {
    alert("Por favor, responda todas as perguntas antes de calcular.");
    return;
  }

  const total =
    transporte * 10 +
    alimentacao +
    energia +
    consumo +
    residuos +
    energia_renovavel +
    moradores +
    tipo_transporte +
    km_semana +
    carne +
    roupas +
    reciclagem +
    reutilizacao +
    ar_condicionado +
    banho +
    standby +
    viagens_aviao +
    desperdicio +
    lampadas_led +
    compras_online;

  const resultadoElemento = document.getElementById('resultado');
  const mensagemElemento = document.getElementById('mensagem-usuario');

  let classeResultado = '';
  let mensagem = '';
  let emoji = '';

  if (total < 50) {
    classeResultado = 'resultado-baixo';
    mensagem = "Você teve um ótimo dia sustentável! 🌱";
    emoji = "🟢";
  } else if (total < 100) {
    classeResultado = 'resultado-medio';
    mensagem = "Você foi razoável, mas dá pra melhorar amanhã! 🌍";
    emoji = "🟠";
  } else {
    classeResultado = 'resultado-alto';
    mensagem = "Vamos tentar economizar mais amanhã? 🔥";
    emoji = "🔴";
  }

  resultadoElemento.innerHTML = `${emoji} Você emitiu aproximadamente <strong class="${classeResultado}">${total.toFixed(2)} kg</strong> de CO₂ hoje.`;
  mensagemElemento.textContent = mensagem;

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado || !usuarioLogado.email) {
    alert("Usuário não identificado.");
    return;
  }

  const dados = {
    email: usuarioLogado.email,
    ...respostas,
    total: total.toFixed(2),
    data: new Date().toLocaleString()
  };

  let respostasUsuarios = JSON.parse(localStorage.getItem("respostasUsuarios")) || [];
  respostasUsuarios = respostasUsuarios.filter(r => r.email !== usuarioLogado.email);
  respostasUsuarios.push(dados);
  localStorage.setItem("respostasUsuarios", JSON.stringify(respostasUsuarios));

  const decisao = document.querySelector('.decisao-do-usuario');
  decisao.innerHTML = '';

  const botaoReiniciar = document.createElement('button');
  botaoReiniciar.textContent = 'Calcular novamente!';
  botaoReiniciar.onclick = () => {
    paginaAtual = 1;
    Object.keys(respostas).forEach(k => respostas[k] = null);
    mostrarPergunta(1);
    document.getElementById('resultado').innerHTML = '';
    decisao.innerHTML = '';
    document.getElementById('pagina1').scrollIntoView({ behavior: 'smooth' });
  };

  const botaoSair = document.createElement('button');
  botaoSair.textContent = "Sair.";
  botaoSair.onclick = () => window.location.href = "/src/frontEnd/pagina1.html";

  const botaoCompartilhar = document.createElement('button');
  botaoCompartilhar.textContent = "Compartilhar resultado";
  botaoCompartilhar.onclick = () => window.location.href = "/src/frontEnd/Dashboard.html";

  decisao.appendChild(botaoReiniciar);
  decisao.appendChild(botaoSair);
  decisao.appendChild(botaoCompartilhar);
}
