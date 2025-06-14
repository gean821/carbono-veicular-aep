const formLogin = document.querySelector('#login-form');
const usuarios = [];


if (formLogin) {
  formLogin.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.querySelector('#user-email').value.trim();
  const senha = document.querySelector('#user-password').value.trim();

  if (email.trim() && senha.trim()) {
    
    const usuarioLogado = {email, senha};
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    let usuariosArmazenados = JSON.parse(localStorage.getItem("usuariosArmazenados")) || [];
    const jaExisteUsuario = usuariosArmazenados.filter(user => user.email === email);
    if (!jaExisteUsuario.length) {
      usuariosArmazenados.push(usuarioLogado);
      localStorage.setItem("usuariosArmazenados", JSON.stringify(usuariosArmazenados));
    }

    window.location.href = "/src/frontEnd/Questionario.html";
  }
});
}