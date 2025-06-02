*AQUI VC ENCONTRA COMO ESTÁ FEITA A ARQUITETURA DO PROJETO*


O que faz cada camada:
Model (Co2Model.js)
👉 Calcula a emissão com base nos dados de transporte e distância.
👉 Guarda os fatores de emissão.

View (Co2View.js)
👉 Atualiza os elementos HTML com o resultado (ex: div.innerHTML = resultado).
👉 Pode mostrar mensagens, sugestões, alertas.

Controller (Co2Controller.js)
👉 Escuta cliques, pega os dados do formulário, chama o Model e passa o resultado pra View.
👉 Separa bem lógica da interface.

app.js
👉 Inicia tudo: escuta os eventos, carrega os dados iniciais, etc.