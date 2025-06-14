const formLogin = document.querySelector('#login-form');
const usuarios = [];

formLogin.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.querySelector('#user-email').value.trim();
  const senha = document.querySelector('#user-password').value.trim();

  if (email.trim() && senha.trim()) {
    
    const usuarioLogado = {email,senha};
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    let usuariosArmazenados = JSON.parse(localStorage.getItem("usuariosArmazenados")) || [];
    const jaExisteUsuario = usuariosArmazenados.filter(user => user.email === email);
    if (!jaExisteUsuario) {
      usuariosArmazenados.push(usuarioLogado);
      localStorage.setItem("usuariosArmazenados", JSON.stringify(usuariosArmazenados));
    }

    window.location.href = "/src/frontEnd/Questionario.html";  }
});

function proximaPergunta(paginaAtual) {
  const proxima = document.getElementById(`pagina${paginaAtual + 1}`);
  if (proxima) {
    proxima.scrollIntoView({ behavior: 'smooth' });
  }
}






function calcularCO2() {
  const transporte = parseFloat(document.getElementById("transporte").value);
  const alimentacao = parseFloat(document.getElementById("alimentacao").value);
  const energia = parseFloat(document.getElementById("energia").value);
  const consumo = parseFloat(document.getElementById("consumo").value);

  if (isNaN(transporte) || isNaN(alimentacao) || isNaN(energia) || isNaN(consumo)) {
    alert("Por favor, responda todas as perguntas antes de calcular.");
    return;
  }

  const km = 10; 
  const total = (transporte * km) + alimentacao + energia + consumo;

  const resultadoTexto = `Você emitiu aproximadamente <strong>${total.toFixed(2)} kg </strong> de CO₂ hoje.<br> Deseja calcular novamente ?</br>`;

  document.getElementById('resultado').innerHTML = resultadoTexto;
  document.getElementById("pagina5").scrollIntoView({ behavior: 'smooth' });

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuarioLogado || !usuarioLogado.email) {
    alert("Usuario não identificado.");
    return;
  }

  const respostas = {
    email: usuarioLogado.email,
    transporte,
    alimentacao,
    energia,
    consumo,
    total: total.toFixed(2),
    data: new Date().toLocaleString()
  };

  var respostasUsuarios = JSON.parse(localStorage.getItem("respostasUsuarios")) || [];
  respostasUsuarios = respostasUsuarios.filter(r=> r.email !== usuarioLogado.email);
  respostasUsuarios.push(respostas);

  localStorage.setItem("respostasUsuarios", JSON.stringify(respostasUsuarios));

  const decisao = document.querySelector('.decisao-do-usuario');
  decisao.innerHTML = '';

  const botaoReiniciar = document.createElement('button');

  botaoReiniciar.textContent = 'Calcular novamente!';
  botaoReiniciar.onclick = () => {
    document.getElementById('pagina1').scrollIntoView({behavior:"smooth"});
  document.getElementById("transporte").selectedIndex = 0;
  document.getElementById("alimentacao").selectedIndex = 0;
  document.getElementById("energia").selectedIndex = 0;
  document.getElementById("consumo").selectedIndex = 0;

  document.getElementById('resultado').innerHTML= '';
  decisao.innerHTML = '';

  };

  const botaoSair = document.createElement('button');
  botaoSair.textContent = "Sair.";
  botaoSair.onclick = () => {
    window.location.href = "/src/frontEnd/pagina1.html";
  };

  decisao.appendChild(botaoReiniciar);
  decisao.appendChild(botaoSair);




}
