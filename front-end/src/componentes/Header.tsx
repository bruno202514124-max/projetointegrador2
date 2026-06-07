import styles from '@/css/base.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from '../../public/img/logo-bulldog.png';

const links = [
  { href: '/mesas', label: 'Mesas' },
  { href: '/cadastro-pedidos', label: 'Pedidos' },
  { href: '/cadastros', label: 'Cadastros' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Header() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    router.push('/');
  }

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
          {links.map(link => {
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
