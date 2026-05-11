import FormularioCadastro from '@/componentes/cadastros/FormularioCadastro';
import Lista from '@/componentes/cadastros/Lista';
import LayoutBase from '@/componentes/LayoutBase';
import estiloBase from '@/css/base.module.css';
import { useState } from 'react';

export type AbasCadastros = 'Mesas' | 'Cartões' | 'Comidas/Bebidas' | 'Usuários' | '';
const abas: AbasCadastros[] = ['Mesas', 'Cartões', 'Comidas/Bebidas', 'Usuários'];

export default function Cadastros() {
  const [abaSelecionada, setAbaSelecionada] = useState<AbasCadastros>('Mesas');
  const [renderLista, setRenderLista] = useState(false);

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

        <div className={`card d-flex flex-lg-row gap-2 ${estiloBase.cardBase}`}>
          {abaSelecionada == 'Mesas' && (
            <FormularioCadastro
              abaSelecionada="Mesas"
              setRenderLista={setRenderLista}
              titulo="Nova mesa"
            />
          )}
          {abaSelecionada == 'Cartões' && (
            <FormularioCadastro
              abaSelecionada="Cartões"
              setRenderLista={setRenderLista}
              titulo="Novo cartão"
            />
          )}
          {abaSelecionada == 'Comidas/Bebidas' && (
            <FormularioCadastro
              abaSelecionada="Comidas/Bebidas"
              setRenderLista={setRenderLista}
              titulo="Novo item"
            />
          )}
          {abaSelecionada == 'Usuários' && (
            <FormularioCadastro
              abaSelecionada="Usuários"
              setRenderLista={setRenderLista}
              titulo="Novo usuário"
            />
          )}

          <Lista
            abaSelecionada={abaSelecionada}
            renderLista={renderLista}
            setRenderLista={setRenderLista}
          />
        </div>
      </div>
    </LayoutBase>
  );
}
