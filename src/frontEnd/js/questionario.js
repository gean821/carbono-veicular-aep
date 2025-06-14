function mostrarPergunta(numero) {
   document.querySelectorAll('.pagina').forEach(p => {
    p.classList.remove('mostrar');
  });
  
  const idPagina = typeof numero === 'number' ? `pagina${numero}` : numero;
  const pagina = document.getElementById(idPagina)  
  
  if (pagina) {
    setTimeout(() => {
      pagina.classList.add('mostrar');
      pagina.scrollIntoView({ behavior: 'smooth' });
    }, 100); // pequeno delay deixa a transição mais visível
  }
}


let paginaAtual = 1;

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
    reutilizacao: null
  };

  const totalPaginas = 14;

  document.querySelectorAll(".opcoes button").forEach(botao => {
    botao.addEventListener("click", () => {
      const valor = parseFloat(botao.getAttribute("data-value"));
      const perguntaPai = botao.closest(".opcoes");
      const tipoPergunta = perguntaPai.getAttribute("data-pergunta");

      respostas[tipoPergunta] = valor;

      paginaAtual++;

      if (paginaAtual <= totalPaginas - 1) {
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
  transporte,
  alimentacao,
  energia,
  consumo,
  residuos,
  energia_renovavel,
  moradores,
  tipo_transporte,
  km_semana,
  carne,
  roupas,
  reciclagem,
  reutilizacao
} = respostas;

  if ([transporte, alimentacao, energia, consumo, residuos].some(val => val === null)) {
    alert("Por favor, responda todas as perguntas antes de calcular.");
    return;
  }

  const km = 10; 
  const total =
  (transporte * km) + alimentacao + energia + consumo + residuos + energia_renovavel + tipo_transporte +
  km_semana +
  carne +
  roupas +
  reciclagem +
  reutilizacao;

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
      alert("Usuario não identificado.");
      return;
    }

    const dados = {
      email: usuarioLogado.email,
      transporte,
      alimentacao,
      energia,
      consumo,
      residuos,
      total: total.toFixed(2),
      data: new Date().toLocaleString()
    };

    var respostasUsuarios = JSON.parse(localStorage.getItem("respostasUsuarios")) || [];
    respostasUsuarios = respostasUsuarios.filter(r => r.email !== usuarioLogado.email);
    respostasUsuarios.push(dados);

    localStorage.setItem("respostasUsuarios", JSON.stringify(respostasUsuarios));

    const decisao = document.querySelector('.decisao-do-usuario');
    decisao.innerHTML = '';

    const botaoReiniciar = document.createElement('button');
    botaoReiniciar.textContent = 'Calcular novamente!';
    
    botaoReiniciar.onclick = () => {
      paginaAtual = 1;
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
        reutilizacao: null
      };

      mostrarPergunta(1);
      document.getElementById('resultado').innerHTML = '';
      decisao.innerHTML = '';
      const primeiraPagina = document.getElementById('pagina1');
      
      if (primeiraPagina) {
        primeiraPagina.scrollIntoView({ behavior: 'smooth' });
      }
    };

  const botaoSair = document.createElement('button');
  botaoSair.textContent = "Sair.";
  botaoSair.onclick = () => {
    window.location.href = "/src/frontEnd/pagina1.html";
  };

  const botaoCompartilhar = document.createElement('button');
  botaoCompartilhar.textContent = "Compartilhar resultado";
  botaoCompartilhar.onclick = () => {
    window.location.href = "/src/frontEnd/Dashboard.html";
  };

  decisao.appendChild(botaoReiniciar);
  decisao.appendChild(botaoSair);
  decisao.appendChild(botaoCompartilhar);
}