import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/css/base.module.css';

const links = [
  { href: '/', label: 'Principal' },
  { href: '/cadastro-pedidos', label: 'Pedidos' },
  { href: '/cadastros', label: 'Cadastros' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Header() {
  const router = useRouter();

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbarCustom}`}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <img src="/img/logo-bulldog.png" alt="Logo Bulldog Brewer" className={styles.logoImg} />

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
        </div>
      </div>
    </nav>
  );
}
