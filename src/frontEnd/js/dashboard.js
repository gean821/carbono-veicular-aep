document.addEventListener('DOMContentLoaded', () => {
  const emailEl = document.getElementById('dash-email');
  const totalEl = document.getElementById('dash-total');
  const dataEl = document.getElementById('dash-data');

  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const respostas = JSON.parse(localStorage.getItem('respostasUsuarios')) || [];
  if (!usuario) {
    window.location.href = "src/frontEnd/login.html";
  }

  const dadosUsuario = respostas.find(r => r.email === usuario?.email);

  if (dadosUsuario) {
    emailEl.textContent = dadosUsuario.email;
    totalEl.textContent = dadosUsuario.total;
    dataEl.textContent = dadosUsuario.data;
  } else {
    emailEl.textContent = 'Usuário não encontrado.';
    totalEl.textContent = '-';
    dataEl.textContent = '-';
  }

  document.getElementById('copiar-link').addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copiado!'))
      .catch(err => alert('Erro ao copiar link.'));
  });

  document.getElementById('baixar-dash').addEventListener('click', () => {
    html2canvas(document.querySelector('.dashboard-container')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'dashboard-carbono.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  });

  document.getElementById('compartilhar-whatsapp').addEventListener('click', () => {
  const texto = `🚨 Meu resultado de emissão de CO₂ foi de ${totalEl.textContent} kg!\nVeja o seu também: https://gean821.github.io/carbono-veicular-aep/`;
  const linkWhatsapp = `https://wa.me/?text=${encodeURIComponent(texto)}`;
  window.open(linkWhatsapp, '_blank');
});


  document.getElementById('voltar').addEventListener('click', () => {
    window.location.href = '/src/frontEnd/pagina1.html';
  });
});
