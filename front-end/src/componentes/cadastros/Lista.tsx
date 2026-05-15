import { api, exibirMensagemDeErro, routerUrlObject } from '@/api';
import estiloBase from '@/css/base.module.css';
import estiloCadastros from '@/css/cadastros.module.css';
import { AbasCadastros } from '@/pages/cadastros';
import { AxiosError } from 'axios';
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

export default function Lista({ abaSelecionada, renderLista, setRenderLista }: ListaProps) {
  const router = useRouter();
  const [itens, setItens] = useState<{ id: string; nome: string; permissao?: string }[]>([]);
  const [abrirModal, setabrirModal] = useState(false);
  const [appElement, setAppElement] = useState<NodeListOf<Element>>();
  const [idEditar, setIdEditar] = useState('');

  function preencherMesas() {
    setItens([
      { id: 'ajsduishdi', nome: '1' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
      { id: '12315616516araf', nome: '2' },
    ]);
  }

  function preencherCartoes() {
    setItens([
      { id: 'ajsduishdi', nome: '1' },
      { id: '12315616516araf', nome: '2' },
    ]);
  }

  function preencherItens() {
    setItens([
      { id: 'ajsduishdi', nome: 'coquinha' },
      { id: '12315616516araf', nome: 'burgaum' },
    ]);
  }

  function preencherLista() {
    setItens([]);
    let url = '';

    if (abaSelecionada == 'Usuários') url = 'usuarios/';

    api
      .get(url)
      .then(res => {
        setItens(res.data);
      })
      .catch(error => {
        if (error instanceof AxiosError) {
          setItens([]);
          exibirMensagemDeErro(error.message);
        } else if (error.response.data.auth === false) {
          localStorage.clear();
          router.push(routerUrlObject, '/');
        } else {
          setItens([]);
          exibirMensagemDeErro(error.response.data.erro);
        }
      });
  }

  async function editar(id: string) {
    setIdEditar(id);
    setabrirModal(true);
  }

  function deletar(item: { id: string; nome: string }) {
    const urlDeletar = '/deletar/';
    let url = '';

    if (abaSelecionada == 'Usuários') url = 'usuarios' + urlDeletar;

    Swal.fire({
      title: `Apagar ${item.nome}?`,
      showCancelButton: true,
      confirmButtonText: 'Apagar',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
      confirmButtonColor: 'red',
    }).then(result => {
      if (result.isConfirmed) {
        api
          .delete(url + item.id)
          .then(preencherLista)
          .catch(error => {
            if (error.response.data.auth === false) {
              localStorage.clear();
              router.push(routerUrlObject, '/');
            } else {
              exibirMensagemDeErro(error.response.data.erro);
            }
          });
      }
    });
  }

  useEffect(() => {
    setAppElement(document.querySelectorAll('.container'));
  }, []);

  useEffect(() => {
    if (abaSelecionada == 'Mesas') preencherMesas();
    if (abaSelecionada == 'Cartões') preencherCartoes();
    if (abaSelecionada == 'Comidas/Bebidas') preencherItens();
    if (abaSelecionada == 'Usuários') preencherLista();
  }, [abaSelecionada, renderLista]);

  return (
    <div className={`card-body ${estiloCadastros.containerLista}`}>
      <h5 className="mb-4">{abaSelecionada} Cadastrados(as)</h5>
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
                  {item.nome}
                </p>

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
          abaSelecionada="Usuários"
          titulo="Editar usuário"
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
