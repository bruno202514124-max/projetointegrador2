/* eslint-disable react-hooks/set-state-in-effect */
import styles from '@/css/base.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import logo from '../../public/img/logo-bulldog.png';

const links = [
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
    if (!usuarioStorage || usuarioStorage === 'undefined') return;

    try {
      const usuario = JSON.parse(usuarioStorage);
      setPermissaoUsuario(usuario.permissao || '');
    } catch (erro) {
      console.error('Erro ao ler credenciais.', erro);
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    router.push('/');
  }

  const linksPermitidos = links.filter(link => {
    const cargo = permissaoUsuario.toLowerCase();

    if (cargo === 'frente') {
      return link.href !== '/cadastros' && link.href !== '/dashboard';
    }

    if (cargo === 'retaguarda') {
      return link.href !== '/dashboard';
    }

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
          {linksPermitidos.map(link => {
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
