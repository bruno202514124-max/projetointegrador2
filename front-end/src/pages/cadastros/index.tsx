import FormularioCadastro from '@/componentes/cadastros/FormularioCadastro';
import LayoutBase from '@/componentes/LayoutBase';
import estiloBase from '@/css/base.module.css';
import estiloCadastros from '@/css/cadastros.module.css';
import { useState } from 'react';

export type AbasCadastros = 'Mesas' | 'Cartões' | 'Comidas/Bebidas' | 'Usuários';
const abas: AbasCadastros[] = ['Mesas', 'Cartões', 'Comidas/Bebidas', 'Usuários'];

export default function Cadastros() {
  const [abaSelecionada, setAbaSelecionada] = useState<AbasCadastros>('Mesas');

  return (
    <LayoutBase
      titulo="Central de Cadastros"
      subtitulo="Cadastro de mesas, cartão, comidas/bebidas e usuários."
    >
      <div>
        <div className="mb-2 d-flex flex-row flex-wrap">
          {abas.map((aba, index) => {
            return (
              <button
                key={index}
                className={`btn ${estiloBase.navLink} ${aba == abaSelecionada ? estiloBase.navLinkActive : ''}`}
                onClick={() => {
                  setAbaSelecionada(aba);
                }}
              >
                {aba}
              </button>
            );
          })}
        </div>

        <div className={`card card-custom d-flex flex-lg-row gap-2 ${estiloBase.cardBase}`}>
          {abaSelecionada == 'Mesas' && <FormularioCadastro abaSelecionada="Mesas" titulo="Nova mesa" />}
          {abaSelecionada == 'Cartões' && (
            <FormularioCadastro abaSelecionada="Cartões" titulo="Novo cartão" />
          )}
          {abaSelecionada == 'Comidas/Bebidas' && (
            <FormularioCadastro abaSelecionada="Comidas/Bebidas" titulo="Novo item" />
          )}
          {abaSelecionada == 'Usuários' && (
            <FormularioCadastro abaSelecionada="Usuários" titulo="Novo usuário" />
          )}

          <div className="card-body">
            <h5 className="section-title mb-4">Mesas cadastradas</h5>

            <div className={`mb-3 d-flex flex-column gap-4 overflow-y-auto ${estiloCadastros.lista}`}>
              <div
                className="d-flex justify-content-between align-items-center rounded-1 px-3 py-2 "
                style={{ backgroundColor: 'gray' }}
              >
                <p>Mesa 2</p>
                <div className="d-flex gap-4">
                  <button className="py-1 px-2 btn btn-warning" onClick={() => alert('editar')}>
                    Editar
                  </button>
                  <p className="py-1 px-2 btn btn-danger" onClick={() => alert('deletar')}>
                    Deletar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
}
