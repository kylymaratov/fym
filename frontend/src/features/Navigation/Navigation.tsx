import Image from 'next/image';
import styles from './Navigation.module.scss';
import Logo from '@/public/images/logo.png';
import { useMemo } from 'react';
import Link from 'next/link';

function Navigation() {
  const navMenu = useMemo(
    () => [
      {
        title: 'Discover',
        href: '/discover',
      },
      {
        title: 'Search',
        href: '/search',
      },
    ],
    [],
  );

  return (
    <div className={styles.navigation}>
      <div>
        <Image src={Logo} alt="logo" priority />
      </div>
      <div className={styles.nav}>
        {navMenu.map((menu) => (
          <div className={styles.menuItem}>
            <Link href={menu.href}>
              <p>{menu.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
