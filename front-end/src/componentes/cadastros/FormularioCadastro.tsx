import estiloCadastros from '@/css/cadastros.module.css';
import { AbasCadastros } from '@/pages/cadastros';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface FormularioCadastroProps {
  abaSelecionada: AbasCadastros;
  titulo: string;
}

export default function FormularioCadastro({ abaSelecionada, titulo }: FormularioCadastroProps) {
  const [numMesa, setNumMesa] = useState(0);
  const [numCart, setNumCart] = useState(0);
  const [nomeItem, setNomeItem] = useState('');
  const [bebidaSimOuNao, setBebidaSimOuNao] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [permissao, setPermissao] = useState('Frente');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  function salvar() {
    if (abaSelecionada == 'Mesas' && numMesa <= 0) {
      Swal.fire('Preencha todos os campos.', 'O número não pode ser menor ou igual a zero.', 'error');
    } else if (abaSelecionada == 'Mesas') {
      alert('Número da nova mesa: ' + numMesa);
    }

    if (abaSelecionada == 'Cartões' && numCart <= 0) {
      Swal.fire('Preencha todos os campos.', 'O número não pode ser menor ou igual a zero.', 'error');
    } else if (abaSelecionada == 'Cartões') {
      alert('Número do novo cartão: ' + numCart);
    }

    if (abaSelecionada == 'Comidas/Bebidas' && nomeItem == '') {
      Swal.fire('Preencha todos os campos.', '', 'error');
    } else if (abaSelecionada == 'Comidas/Bebidas') {
      const dados = {
        nome: nomeItem,
        bebida: bebidaSimOuNao,
      };

      alert(dados.nome + ', ' + dados.bebida);
    }

    if (
      abaSelecionada == 'Usuários' &&
      (nomeUsuario == '' || permissao == '' || senha == '' || confirmaSenha == '')
    ) {
      Swal.fire('Preencha todos os campos.', '', 'error');
    } else if (abaSelecionada == 'Usuários' && senha == confirmaSenha) {
      const dados = {
        nome: nomeUsuario,
        permissao: permissao,
        senha: senha,
        confirmaSenha: confirmaSenha,
      };

      alert(dados.nome + ', ' + dados.permissao + ', ' + dados.senha + ', ' + dados.confirmaSenha);
    } else if (abaSelecionada == 'Usuários') {
      Swal.fire('As senhas precisam ser iguais.', '', 'error');
    }
  }

  function limparCampos() {
    if (abaSelecionada == 'Mesas') {
      setNumMesa(0);
    }

    if (abaSelecionada == 'Cartões') {
      setNumCart(0);
    }

    if (abaSelecionada == 'Comidas/Bebidas') {
      setNomeItem('');
      setBebidaSimOuNao(false);
    }

    if (abaSelecionada == 'Usuários') {
      setNomeUsuario('');
      setPermissao('Frente');
      setSenha('');
      setConfirmaSenha('');
    }
  }

  return (
    <div className="card-body">
      <h5 className="section-title">{titulo}</h5>

      {abaSelecionada == 'Mesas' && (
        <div className={`mb-3 d-flex flex-column gap-2`}>
          <div>
            <label className="form-label">Número da mesa</label>
            <input
              value={numMesa}
              onChange={e => setNumMesa(Number(e.currentTarget.value))}
              type="number"
              min={0}
              className="form-control"
              placeholder="Número da mesa"
            />
          </div>
        </div>
      )}

      {abaSelecionada == 'Cartões' && (
        <div className={`mb-3 d-flex flex-column gap-2 `}>
          <div>
            <label className="form-label">Número do cartão</label>
            <input
              value={numCart}
              onChange={e => setNumCart(Number(e.currentTarget.value))}
              type="number"
              className="form-control"
              placeholder="Número do cartão"
            />
          </div>
        </div>
      )}

      {abaSelecionada == 'Comidas/Bebidas' && (
        <div className={`mb-3 d-flex flex-column gap-2 ${estiloCadastros.summaryBox}`}>
          <div>
            <label className="form-label">Nome</label>
            <input
              value={nomeItem}
              onChange={e => setNomeItem(e.currentTarget.value)}
              type="text"
              className="form-control"
              placeholder="Nome da comida/bebida"
            />
          </div>
          <div className="mt-4 d-flex gap-2">
            <label className="form-label m-0">É bebida?</label>
            <input
              checked={bebidaSimOuNao}
              onChange={e => setBebidaSimOuNao(e.currentTarget.checked)}
              type="checkbox"
            />
          </div>
        </div>
      )}

      {abaSelecionada == 'Usuários' && (
        <div className={`mb-3 d-flex flex-column gap-2 ${estiloCadastros.summaryBox}`}>
          <div>
            <label className="form-label">Nome</label>
            <input
              value={nomeUsuario}
              onChange={e => setNomeUsuario(e.currentTarget.value)}
              type="text"
              className="form-control"
              placeholder="Nome do usuário"
            />
          </div>

          <div>
            <label className="form-label">Permissão</label>
            <select
              value={permissao}
              onChange={e => setPermissao(e.currentTarget.value)}
              className="form-control"
            >
              <option value="Frente">Frente</option>
              <option value="Retaguarda">Retaguarda</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <div>
            <label className="form-label">Senha</label>
            <input
              value={senha}
              onChange={e => setSenha(e.currentTarget.value)}
              type="password"
              className="form-control"
              placeholder="Senha do usuário"
            />
          </div>

          <div>
            <label className="form-label">Confirmar senha</label>
            <input
              value={confirmaSenha}
              onChange={e => setConfirmaSenha(e.currentTarget.value)}
              type="password"
              className="form-control"
              placeholder="Digite a mesma senha"
            />
          </div>
        </div>
      )}

      <div className="mt-4 d-grid gap-2">
        <button className="btn btn-warning fw-bold mt-4" onClick={salvar}>
          Salvar
        </button>
        <button className={`btn ${estiloCadastros.btnOutlineYellow}`} onClick={limparCampos}>
          Limpar Campos
        </button>
      </div>
    </div>
  );
}
