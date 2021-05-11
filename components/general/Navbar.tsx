import React, { useState } from 'react';
import { useUser } from '../../context/userContext';
import Image from 'next/image';
import Link from 'next/link';

import '../../style/navbar.min.css';

interface NavbarProps {
  isAdminNav?: boolean;
  active?: string;
}
const Navbar = ({ isAdminNav, active }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.navbar_hamburger');
    if (menu && hamburger) {
      if (!isOpen) {
        menu.classList.add('open');
        hamburger.classList.add('open');
        setIsOpen(true);
      } else {
        menu.classList.remove('open');
        hamburger.classList.remove('open');
        setIsOpen(false);
      }
    }
  };

  const { user, login, logout } = useUser();

  console.log(isAdminNav);

  return (
    <div className='navbar_background'>
      <div className='container'>
        <div className='navbar'>
          <div className='navbar_hamburger' onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1 className='navbar_title'>PatenteRagazzi</h1>

          <div className='menu'>
            <div className='navbar_close' onClick={toggleMenu}>
              <span></span>
              <span></span>
            </div>

            {isAdminNav && (
              <>
                <Link href='/admin'>
                  <a className={active == 'images' ? 'active' : ''}>Immagini</a>
                </Link>
                <Link href='/admin/theory'>
                  <a className={active == 'theory' ? 'active' : ''}>Teoria</a>
                </Link>
                <Link href='/admin/questions'>
                  <a className={active == 'questions' ? 'active' : ''}>
                    Domande
                  </a>
                </Link>
                <Link href='/admin/posts'>
                  <a className={active == 'posts' ? 'active' : ''}>Posts</a>
                </Link>
                <Link href='/admin/problems'>
                  <a className={active == 'problems' ? 'active' : ''}>
                    Problemi
                  </a>
                </Link>
                <Link href='/admin/stories'>
                  <a className={active == 'stories' ? 'active' : ''}>Stories</a>
                </Link>
              </>
            )}
            {!isAdminNav && (
              <>
                <Link href='/'>
                  <a>Home</a>
                </Link>
                <Link href='/posts'>
                  <a className={active == 'posts' ? 'active' : ''}>Posts</a>
                </Link>
                <Link href='/teoria'>
                  <a className={active == 'teoria' ? 'active' : ''}>Teoria</a>
                </Link>
              </>
            )}
          </div>
          <div className='navbar_login'>
            {!user && <p onClick={login}>Accedi</p>}
            {user && user.picture && (
              <Image
                src={user.picture}
                alt='Foto'
                width={40}
                height={40}
                onClick={logout}
                className='navbar_profile'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
