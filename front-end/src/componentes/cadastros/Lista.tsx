/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { api } from '@/api';
import estiloBase from '@/css/base.module.css';
import estiloCadastros from '@/css/cadastros.module.css';
import { AbasCadastros } from '@/pages/cadastros';
import { tratarErro } from '@/utils/tratarErro';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import FormularioCadastro from './FormularioCadastro';

interface ListaProps {
  abaSelecionada: AbasCadastros;
  renderLista: boolean;
  setRenderLista: Dispatch<SetStateAction<boolean>>;
}

interface Item {
  id: string;
  nome?: string;
  numero?: string;
  preco?: number;
  permissao?: string;
}

export default function Lista({ abaSelecionada, renderLista, setRenderLista }: ListaProps) {
  const router = useRouter();
  const formatarReal = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const [itens, setItens] = useState<Item[]>([]);
  const [abrirModal, setabrirModal] = useState(false);
  const [appElement, setAppElement] = useState<NodeListOf<Element>>();
  const [idEditar, setIdEditar] = useState('');
  const [titulo, setTitulo] = useState('Editar mesa');

  useEffect(() => {
    switch (abaSelecionada) {
      case 'Mesas':
        setTitulo('Editar mesa');
        break;
      case 'Cartões':
        setTitulo('Editar cartão');
        break;
      case 'Comidas/Bebidas':
        setTitulo('Editar item');
        break;
      case 'Usuários':
        setTitulo('Editar usuário');
        break;

      default:
        break;
    }
  }, [abaSelecionada]);

  function preencherLista() {
    setItens([]);
    let url = '';

    switch (abaSelecionada) {
      case 'Mesas':
        url = 'mesas/';
        break;
      case 'Cartões':
        url = 'cartoes/';
        break;
      case 'Comidas/Bebidas':
        url = 'itens/';
        break;
      case 'Usuários':
        url = 'usuarios/';
        break;

      default:
        return;
    }

    api
      .get(url)
      .then(res => {
        setItens(res.data);
      })
      .catch(error => {
        setItens([]);
        tratarErro(error, router);
      });
  }

  async function editar(id: string) {
    setIdEditar(id);
    setabrirModal(true);
  }

  function deletar(item: Item) {
    let url = '';
    let mesaOuCartao = '';

    switch (abaSelecionada) {
      case 'Mesas':
        url = 'mesas';
        mesaOuCartao = 'Mesa';
        break;
      case 'Cartões':
        url = 'cartoes';
        mesaOuCartao = 'Cartão';
        break;
      case 'Comidas/Bebidas':
        url = 'itens';
        break;
      case 'Usuários':
        url = 'usuarios';
        break;

      default:
        return;
    }

    url = url.concat('/deletar/', item.id);

    Swal.fire({
      title: `Apagar ${item.nome || mesaOuCartao + ' ' + item.numero}?`,
      showCancelButton: true,
      confirmButtonText: 'Apagar',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
      confirmButtonColor: 'red',
    }).then(result => {
      if (result.isConfirmed) {
        api
          .delete(url)
          .then(() => {
            Swal.fire('Deletado!', 'Removido com sucesso.', 'success');
            preencherLista();
          })
          .catch(error => {
            tratarErro(error, router);
          });
      }
    });
  }

  function mascOuFem(abaSelecionada: AbasCadastros) {
    if (abaSelecionada == 'Mesas' || abaSelecionada == 'Comidas/Bebidas') {
      return 'a';
    } else {
      return 'o';
    }
  }

  useEffect(() => {
    setAppElement(document.querySelectorAll('.container'));
  }, []);

  useEffect(() => {
    preencherLista();
  }, [abaSelecionada, renderLista]);

  return (
    <div className={`card-body ${estiloCadastros.containerLista}`}>
      <h5 className="mb-4">
        {abaSelecionada} Cadastrad{mascOuFem(abaSelecionada)}s
      </h5>
      <div className={`mb-3 d-flex flex-column gap-4 overflow-y-auto ${estiloCadastros.lista}`}>
        {itens.map((item, index) => {
          return (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center rounded-1 px-3 py-2 "
              style={{ backgroundColor: 'gray' }}
            >
              <div className="d-flex flex-column w-50 gap-2">
                <p>
                  {abaSelecionada == 'Mesas' && 'Mesa'} {abaSelecionada == 'Cartões' && 'Cartão'}{' '}
                  {item.nome && item.nome}
                  {item.numero && item.numero}
                </p>

                {item.preco && <p>Preço: {formatarReal.format(item.preco)}</p>}
                {item.permissao && <p>Permissão: {item.permissao}</p>}
              </div>

              <div className="d-flex gap-4">
                <button className="py-1 px-2 btn btn-warning" onClick={() => editar(item.id)}>
                  Editar
                </button>
                <p className="py-1 px-2 btn btn-danger" onClick={() => deletar(item)}>
                  Deletar
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <ReactModal
        appElement={appElement}
        isOpen={abrirModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
        className={`d-flex flex-column gap-2 align-items-center justify-content-center ${estiloBase.cardBase}`}
      >
        <FormularioCadastro
          abaSelecionada={abaSelecionada}
          titulo={titulo}
          setRenderLista={setRenderLista}
          editar={true}
          id={idEditar}
        />
        <button className="btn btn-danger w-100" onClick={() => setabrirModal(false)}>
          Fechar
        </button>
      </ReactModal>
    </div>
  );
}
