import React, { useState } from 'react';
import { useUser } from '../context/userContext';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    if (!isOpen) {
      document.querySelector('.navbar_menu').classList += ' open';
      document.querySelector('.navbar_hamburger').classList += ' open';
      setIsOpen(true);
    } else {
      document.querySelector('.navbar_menu').classList = 'navbar_menu';
      document.querySelector('.navbar_hamburger').classList =
        'navbar_hamburger';
      setIsOpen(false);
    }
  };

  const { loadingUser, user, login, logout } = useUser();

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='navbar_image'>
          <div className='div_navbar_image'>
            <Image
              src='/patenteragazzi.png'
              alt='Logo patenteragazzi'
              layout={'intrinsic'}
              width={500}
              height={500}
            />
          </div>

          <div className='navbar_img_background'></div>
        </div>

        <h1 className='navbar_title'>Patenteragazzi</h1>

        <div className='navbar_hamburger' onClick={openMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className='navbar_menu'>
          <button>
            <a href='#social'> Social</a>
          </button>
          <button>
            <a href='#quiz'> Quiz</a>
          </button>
          <button>
            <a href='#stats'> Statistiche</a>
          </button>
          {!user && <button onClick={login}>Accedi</button>}
          {user && <button onClick={logout}>Esci</button>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
