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

  return (
    <div className='navbar'>
      <div className='container-full'>
        <div className='logo'>
          {/* <img src='/patenteragazzi.png' alt='Logo' /> */}
          <Image src='/patenteragazzi.svg' alt='Logo' width={72} height={72} />
          <h1>PatenteRagazzi</h1>
        </div>

        <div className='menu'>
          {!isAdminNav && (
            <>
              <Link href='/'>
                <a className={active == 'home' ? 'active' : ''}>HOME</a>
              </Link>
              <Link href='/quiz'>
                <a className={active == 'quiz' ? 'active' : ''}>QUIZ</a>
              </Link>
              <Link href='/posts'>
                <a className={active == 'post' ? 'active' : ''}>POSTS</a>
              </Link>
              {/* <Link href='/#faq'>
                <a className={active == 'faq' ? 'active' : ''}>FAQ</a>
              </Link> */}
              <Link href='/teoria'>
                <a className={active == 'teoria' ? 'active' : ''}>TEORIA</a>
              </Link>

              <span></span>
              <a
                aria-label='Tiktok link'
                target='_blank'
                href='https://www.tiktok.com/@patenteragazzi?_d=secCgsIARCbDRgBIAMoARI%2BCjwsj44V9oynClqip6A4ZSRxXQ7IMbrbj0dcklcqsrDMDvXA6SQeKXZUJJ6Jvd9mYItFThRf0RLwXwuGhlsaAA%3D%3D&language=en&sec_uid=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&sec_user_id=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&share_app_name=musically&share_author_id=6870055060148929542&share_link_id=304e3355-7227-4486-b53c-9ad57578e237&timestamp=1599646252&u_code=deb73gifajfmm5&user_id=6870055060148929542&utm_campaign=client_share&utm_medium=android&utm_source=copy&source=h5_m'
                rel='noopener noreferrer'
                className='social'
              >
                <Image
                  src='/tiktok.svg'
                  alt='Tiktok'
                  layout={'intrinsic'}
                  width={22}
                  height={22}
                />
              </a>
              <a
                aria-label='Instagram Link'
                href='https://www.instagram.com/patenteragazzi/'
                target='_blank'
                rel='noopener noreferrer'
                className='social'
              >
                <Image
                  src='/instagram.svg'
                  alt='Instagram'
                  layout={'intrinsic'}
                  width={25}
                  height={25}
                />
              </a>
              <span></span>
              {!user && <div onClick={login}>Accedi</div>}
              {user && user.picture && (
                <Image
                  src={user.picture}
                  alt='Instagram'
                  layout={'intrinsic'}
                  width={40}
                  height={40}
                  className='profile_image'
                  onClick={logout}
                />
              )}
            </>
          )}

          {isAdminNav && (
            <>
              <Link href='/admin'>
                <a className={active == 'immagini' ? 'active' : ''}>IMMAGINI</a>
              </Link>

              <Link href='/admin/theory'>
                <a className={active == 'teoria' ? 'active' : ''}>TEORIA</a>
              </Link>

              <Link href='/admin/questions'>
                <a className={active == 'domande' ? 'active' : ''}>DOMANDE</a>
              </Link>

              <Link href='/admin/posts'>
                <a className={active == 'post' ? 'active' : ''}>POSTS</a>
              </Link>
              {/* <Link href='/admin/faq'>
                <a className={active == 'faq' ? 'active' : ''}>FAQ</a>
              </Link> */}
              <Link href='/admin/problems'>
                <a className={active == 'problems' ? 'active' : ''}>PROBLEMI</a>
              </Link>
              <Link href='/admin/stories'>
                <a className={active == 'stories' ? 'active' : ''}>STORIES</a>
              </Link>

              <span></span>

              {!user && <div onClick={login}>Accedi</div>}
              {user && (
                <Image
                  src={user.picture}
                  alt='Instagram'
                  layout={'intrinsic'}
                  width={40}
                  height={40}
                  className='profile_image'
                />
              )}
            </>
          )}
        </div>
        <div className='navbar_hamburger' onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
