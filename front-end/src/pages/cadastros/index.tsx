/* eslint-disable react-hooks/set-state-in-effect */
import FormularioCadastro from '@/componentes/cadastros/FormularioCadastro';
import Lista from '@/componentes/cadastros/Lista';
import LayoutBase from '@/componentes/LayoutBase';
import estiloBase from '@/css/base.module.css';
import { useEffect, useState } from 'react';

export type AbasCadastros = 'Mesas' | 'Cartões' | 'Comidas/Bebidas' | 'Usuários';
const todasAsAbas: AbasCadastros[] = ['Mesas', 'Cartões', 'Comidas/Bebidas', 'Usuários'];

export default function Cadastros() {
  const [abaSelecionada, setAbaSelecionada] = useState<AbasCadastros>('Mesas');
  const [titulo, setTitulo] = useState('Nova mesa');
  const [renderLista, setRenderLista] = useState(false);
  
  // Estado para armazenar a permissão de quem está usando o sistema
  const [permissaoUsuario, setPermissaoUsuario] = useState('');

  // Busca o usuário logado no localStorage
  useEffect(() => {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuario = JSON.parse(usuarioStorage);
      setPermissaoUsuario(usuario.permissao || '');
    }
  }, []);

  useEffect(() => {
    switch (abaSelecionada) {
      case 'Mesas':
        setTitulo('Nova mesa');
        break;
      case 'Cartões':
        setTitulo('Novo cartão');
        break;
      case 'Comidas/Bebidas':
        setTitulo('Nova item');
        break;
      case 'Usuários':
        setTitulo('Novo usuário');
        break;

      default:
        break;
    }
  }, [abaSelecionada]);

  // 🔒 TRAVA: Só inclui a aba "Usuários" se for administrador
  const abasPermitidas = todasAsAbas.filter((aba) => {
    if (aba === 'Usuários') {
      return permissaoUsuario.toLowerCase() === 'administrador';
    }
    return true; 
  });

  return (
    <LayoutBase
      titulo="Central de Cadastros"
      subtitulo="Cadastro de mesas, cartão, comidas/bebidas e usuários."
    >
      <div>
        <div className="mb-2 d-flex flex-row flex-wrap">
          {/* Mapeia apenas as abas que o usuário tem permissão para ver */}
          {abasPermitidas.map((aba, index) => {
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
          <FormularioCadastro
            abaSelecionada={abaSelecionada}
            setRenderLista={setRenderLista}
            titulo={titulo}
          />

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