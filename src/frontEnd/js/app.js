const botao = document.querySelector('#botao-startQuestionary');

function proximaPagina(paginaAtual) {
  const proxima = document.getElementById(`pagina${paginaAtual + 1}`);
  if (proxima) {
    proxima.scrollIntoView({ behavior: 'smooth' });
  }
}

botao.addEventListener('click', proximaPagina);

function calcularCO2() {
  const transporte = parseFloat(document.getElementById("transporte").value);
  const alimentacao = parseFloat(document.getElementById("alimentacao").value);
  const energia = parseFloat(document.getElementById("energia").value);
  const consumo = parseFloat(document.getElementById("consumo").value);

  const km = 10; 
  const total = (transporte * km) + alimentacao + energia + consumo;

  document.getElementById("resultado").innerHTML =
    `Você emitiu aproximadamente <strong>${total.toFixed(2)} kg</strong> de CO₂ hoje.`;

  document.getElementById("pagina5").scrollIntoView({ behavior: 'smooth' });
}
