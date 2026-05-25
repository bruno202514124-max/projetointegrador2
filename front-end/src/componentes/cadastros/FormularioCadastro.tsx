import { api, exibirMensagemDeErro, routerUrlObject } from '@/api';
import estiloCadastros from '@/css/cadastros.module.css';
import { AbasCadastros } from '@/pages/cadastros';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import Swal from 'sweetalert2';

interface FormularioCadastroProps {
  abaSelecionada: AbasCadastros;
  setRenderLista: Dispatch<SetStateAction<boolean>>;
  titulo: string;
  editar?: boolean;
  id?: string;
}

export default function FormularioCadastro({
  abaSelecionada,
  setRenderLista,
  titulo,
  editar = false,
  id = '',
}: FormularioCadastroProps) {
  const router = useRouter();
  const [numMesa, setNumMesa] = useState(0);
  const [numCart, setNumCart] = useState(0);
  const [nomeItem, setNomeItem] = useState('');
  const [precoItem, setPrecoItem] = useState(0);
  const [bebidaSimOuNao, setBebidaSimOuNao] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [permissao, setPermissao] = useState('Frente');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function tratarErro(error: any) {
    if (error instanceof AxiosError && error.response?.data.autent === false) {
      Swal.fire(error.response?.data.erro, 'Redirecionando para tela de login...', 'error').then(
        result => {
          if (result.isConfirmed) {
            localStorage.clear();
            router.push(routerUrlObject, '/');
          }
        }
      );
    } else if (error.response.data) {
      console.log('erro => ', error);
      exibirMensagemDeErro(error.response.data.erro);
    } else {
      console.log('erro => ', error);
    }
  }

  function criarMesa(novaMesa: { numero: string }) {
    api
      .post('/mesas/criar', novaMesa)
      .then(res => {
        if (res.data.codigo == 400) throw new Error(res.data.mensagem);

        limparCampos();
        setRenderLista(prev => !prev);

        Swal.fire('Informações salvas com sucesso!', '', 'success');
      })
      .catch(error => {
        tratarErro(error);
      });
  }

  function editarMesa(novaMesa: { id: string; numero: string }) {
    api
      .patch('/mesas/atualizar', novaMesa)
      .then(res => {
        if (res.data.codigo == 400) throw new Error(res.data.mensagem);

        limparCampos();
        setRenderLista(prev => !prev);

        Swal.fire('Informações salvas com sucesso!', '', 'success');
      })
      .catch(error => {
        tratarErro(error);
      });
  }

  function criarCartao(novoCartao: { numero: string }) {
    api
      .post('/cartoes/criar', novoCartao)
      .then(res => {
        if (res.data.codigo == 400) throw new Error(res.data.mensagem);

        limparCampos();
        setRenderLista(prev => !prev);

        Swal.fire('Informações salvas com sucesso!', '', 'success');
      })
      .catch(error => {
        tratarErro(error);
      });
  }

  function editarCartao(novoCartao: { id: string; numero: string }) {
    api
      .patch('/cartoes/atualizar', novoCartao)
      .then(res => {
        if (res.data.codigo == 400) throw new Error(res.data.mensagem);

        limparCampos();
        setRenderLista(prev => !prev);

        Swal.fire('Informações salvas com sucesso!', '', 'success');
      })
      .catch(error => {
        tratarErro(error);
      });
  }

  function criarItem(novoItem: { nome: string; preco: number; bebida: boolean }) {
    api
      .post('/itens/criar', novoItem)
      .then(res => {
        if (res.data.codigo == 400) throw new Error(res.data.mensagem);

        limparCampos();
        setRenderLista(prev => !prev);

        Swal.fire('Informações salvas com sucesso!', '', 'success');
      })
      .catch(error => {
        tratarErro(error);
      });
  }

  function editarItem(novoItem: { id: string; nome: string; preco: number; bebida: boolean }) {
    api
      .patch('/itens/atualizar', novoItem)
      .then(res => {
        if (res.data.codigo == 400) throw new Error(res.data.mensagem);

        limparCampos();
        setRenderLista(prev => !prev);

        Swal.fire('Informações salvas com sucesso!', '', 'success');
      })
      .catch(error => {
        tratarErro(error);
      });
  }

  function criarUsuario(novoUsuario: { nome: string; permissao: string; senha: string }) {
    api
      .post('/usuarios/criar', novoUsuario)
      .then(res => {
        if (res.data.codigo == 400) throw new Error(res.data.mensagem);

        limparCampos();
        setRenderLista(prev => !prev);

        Swal.fire('Informações salvas com sucesso!', '', 'success');
      })
      .catch(error => {
        tratarErro(error);
      });
  }

  function editarUsuario(novosDados: { id: string; nome: string; permissao: string; senha: string }) {
    api
      .patch('/usuarios/atualizar', novosDados)
      .then(res => {
        if (res.data.codigo == 400) throw new Error(res.data.mensagem);

        limparCampos();
        setRenderLista(prev => !prev);

        Swal.fire('Informações salvas com sucesso!', '', 'success');
      })
      .catch(error => {
        tratarErro(error);
      });
  }

  function salvar() {
    if (abaSelecionada == 'Mesas' && editar && id != '') {
      const dados = {
        id,
        numero: numMesa.toString(),
      };
      editarMesa(dados);
    } else if (abaSelecionada == 'Mesas' && numMesa <= 0) {
      Swal.fire('Preencha todos os campos.', 'O número não pode ser menor ou igual a zero.', 'error');
    } else if (abaSelecionada == 'Mesas') {
      const dados = {
        numero: numMesa.toString(),
      };
      criarMesa(dados);
    }

    if (abaSelecionada == 'Cartões' && editar && id != '') {
      const dados = {
        id,
        numero: numCart.toString(),
      };
      editarCartao(dados);
    } else if (abaSelecionada == 'Cartões' && numCart <= 0) {
      Swal.fire('Preencha todos os campos.', 'O número não pode ser menor ou igual a zero.', 'error');
    } else if (abaSelecionada == 'Cartões') {
      const dados = {
        numero: numCart.toString(),
      };
      criarCartao(dados);
    }

    if (abaSelecionada == 'Comidas/Bebidas' && editar && id != '') {
      const dados = {
        id,
        nome: nomeItem,
        preco: precoItem,
        bebida: bebidaSimOuNao,
      };
      editarItem(dados);
    } else if (abaSelecionada == 'Comidas/Bebidas' && (nomeItem == '' || precoItem == 0)) {
      Swal.fire('Preencha todos os campos.', '', 'error');
    } else if (abaSelecionada == 'Comidas/Bebidas') {
      const dados = {
        nome: nomeItem,
        preco: precoItem,
        bebida: bebidaSimOuNao,
      };

      criarItem(dados);
    }

    if (abaSelecionada == 'Usuários' && editar && id != '') {
      const novosDados = {
        id: id,
        nome: nomeUsuario,
        permissao: permissao,
        senha: senha,
      };
      editarUsuario(novosDados);
    } else if (
      abaSelecionada == 'Usuários' &&
      (nomeUsuario == '' || permissao == '' || senha == '' || confirmaSenha == '')
    ) {
      Swal.fire('Preencha todos os campos.', '', 'error');
    } else if (abaSelecionada == 'Usuários' && senha == confirmaSenha) {
      const novosDados = {
        nome: nomeUsuario,
        permissao: permissao,
        senha: senha,
      };

      criarUsuario(novosDados);
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
      setPrecoItem(0);
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
      <h5>{titulo}</h5>

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
              min={0}
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

          <div>
            <label className="form-label">Preço (R$)</label>
            <input
              value={precoItem}
              onChange={e => setPrecoItem(Number(e.currentTarget.value))}
              type="number"
              min={0}
              className="form-control"
              placeholder="Preçco do item"
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

      <div className="d-grid gap-2">
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
