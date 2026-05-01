import { atualizarDataHora } from './atualizarDataHora.js';

document.getElementById('cadastrarMesa').addEventListener('click', cadastrarMesa, false);
document.getElementById('limparInputMesa').addEventListener('click', limparInputMesa, false);
document.getElementById('cadastrarCartao').addEventListener('click', cadastrarCartao, false);
document.getElementById('limparInputCartao').addEventListener('click', limparInputCartao, false);
document.getElementById('cadastrarItens').addEventListener('click', cadastrarItens, false);
document.getElementById('limparDadosItens').addEventListener('click', limparDadosItens, false);
document.getElementById('cadastrarUsuario').addEventListener('click', cadastrarUsuario, false);
document.getElementById('limparDadosUsuario').addEventListener('click', limparDadosUsuario, false);

function cadastrarMesa() {
  const numeroMesa = document.getElementById('novaMesa').value;
  console.log(numeroMesa);
}

function limparInputMesa() {
  document.getElementById('novaMesa').value = '';
}

function cadastrarCartao() {
  const numeroCartao = document.getElementById('novoCartao').value;
  console.log(numeroCartao);
}

function limparInputCartao() {
  document.getElementById('novoCartao').value = '';
}

function cadastrarItens() {
  const nomeItem = document.getElementById('novoItem').value;
  const bebidaSimOuNao = document.getElementById('bebidaSimOuNao').checked;
  console.log({ nomeItem, bebidaSimOuNao });
}

function limparDadosItens() {
  document.getElementById('novoItem').value = '';
  document.getElementById('bebidaSimOuNao').checked = false;
}

function cadastrarUsuario() {
  const nomeUsuario = document.getElementById('nomeUsuario').value;
  const permissao = document.getElementById('permissao').value;
  const senha = document.getElementById('senha').value;
  const confirmaSenha = document.getElementById('confirmaSenha').value;

  if (nomeUsuario == '' || permissao == '' || senha == '' || confirmaSenha == '') {
    alert('Preencha todos os campos.');
  } else if (senha == confirmaSenha) {
    console.log({ nomeUsuario, permissao, senha, confirmaSenha });
  } else {
    alert('As senhas precisam ser iguais.');
  }
}

function limparDadosUsuario() {
  document.getElementById('nomeUsuario').value = '';
  document.getElementById('permissao').value = '';
  document.getElementById('senha').value = '';
  document.getElementById('confirmaSenha').value = '';
}

atualizarDataHora();
