export function atualizarDataHora() {
  const agora = new Date();
  document.getElementById('dataHora').innerText =
    agora.toLocaleDateString('pt-BR') +
    ' ' +
    agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
