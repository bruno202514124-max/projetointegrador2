import styles from '@/css/base.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import logo from '../../public/img/logo-bulldog.png';

const todosOsLinks = [
  { href: '/mesas', label: 'Mesas' },
  { href: '/cadastro-pedidos', label: 'Pedidos' },
  { href: '/cadastros', label: 'Cadastros' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Header() {
  const router = useRouter();
  const [permissaoUsuario, setPermissaoUsuario] = useState('');

  useEffect(() => {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuario = JSON.parse(usuarioStorage);
      setPermissaoUsuario(usuario.permissao || '');
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    router.push('/');
  }

  // Lógica de filtro de permissões com proteção de maiúsculas/minúsculas
  const linksPermitidos = todosOsLinks.filter((link) => {
    // Converte a permissão do banco para letras minúsculas para comparar com segurança
    const permissaoFormatada = permissaoUsuario.toLowerCase();

    // Nível Máximo: Apenas o Administrador vê o Dashboard
    if (link.label === 'Dashboard') {
      return permissaoFormatada === 'administrador';
    }

    // Nível Médio: Administrador e Retaguarda veem os Cadastros
    if (link.label === 'Cadastros') {
      return permissaoFormatada === 'administrador' || permissaoFormatada === 'retaguarda';
    }

    // Nível Básico: Frente, Retaguarda e Administrador veem Mesas e Pedidos
    return true; 
  });

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbarCustom}`}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image src={logo} alt="Logo Bulldog Brewer" className={styles.logoImg} />

          <div className={styles.brandText}>
            <strong>Bulldog Brewer</strong>
            <small>Sistema de Comandas</small>
          </div>
        </Link>

        <div className="navbar-nav ms-auto d-flex flex-row flex-wrap gap-3">
          {linksPermitidos.map((link) => {
            const ativo = router.pathname === link.href || router.pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${ativo ? styles.navLinkActive : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
          <button type="button" onClick={logout} className={styles.navLogout}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}