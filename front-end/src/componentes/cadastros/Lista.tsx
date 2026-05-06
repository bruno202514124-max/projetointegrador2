import estiloCadastros from '@/css/cadastros.module.css';
import { AbasCadastros } from '@/pages/cadastros';
import { useEffect, useState } from 'react';

interface ListaProps {
  abaSelecionada: AbasCadastros;
}

export default function Lista({ abaSelecionada }: ListaProps) {
  const [itens, setItens] = useState<{ id: string; nome: string }[]>([]);

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

  function preencherUsuarios() {
    setItens([
      { id: 'ajsduishdi', nome: 'fulano' },
      { id: '12315616516araf', nome: 'ciclano' },
    ]);
  }

  useEffect(() => {
    if (abaSelecionada == 'Mesas') preencherMesas();
    if (abaSelecionada == 'Cartões') preencherCartoes();
    if (abaSelecionada == 'Comidas/Bebidas') preencherItens();
    if (abaSelecionada == 'Usuários') preencherUsuarios();
  }, [abaSelecionada]);

  return (
    <div className="card-body">
      <h5 className="mb-4">{abaSelecionada} Cadastrados(as)</h5>
      <div className={`mb-3 d-flex flex-column gap-4 overflow-y-auto ${estiloCadastros.lista}`}>
        {itens.map((item, index) => {
          return (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center rounded-1 px-3 py-2 "
              style={{ backgroundColor: 'gray' }}
            >
              <p>
                {abaSelecionada == 'Mesas' && 'Mesa'} {abaSelecionada == 'Cartões' && 'Cartão'}{' '}
                {item.nome}
              </p>
              <div className="d-flex gap-4">
                <button className="py-1 px-2 btn btn-warning" onClick={() => alert('editar')}>
                  Editar
                </button>
                <p className="py-1 px-2 btn btn-danger" onClick={() => alert('deletar')}>
                  Deletar
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
