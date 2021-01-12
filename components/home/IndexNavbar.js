import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '../../context/userContext';

//Import Css
import '../../indexNavbar.min.css';

const IndexNavbar = () => {
  const { user, login, logout } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (!isOpen) {
      document.querySelector('.index_menu').classList += ' open';
      document.querySelector('.index_navbar_hamburger').classList += ' open';
      setIsOpen(true);
    } else {
      document.querySelector('.index_menu').classList = 'index_menu';
      document.querySelector('.index_navbar_hamburger').classList =
        'index_navbar_hamburger';
      setIsOpen(false);
    }
  };

  return (
    <div className='index_navbar'>
      <div className='index_logo'>
        <Image
          src='/patenteragazzi.png'
          alt='Logo'
          width={138}
          height={138}
          layout={'intrinsic'}
        />
        <h1>Patenteragazzi</h1>
      </div>

      <div className='index_menu'>
        <Link href='/'>
          <a className='active' title='home'>
            HOME
          </a>
        </Link>
        <Link href='/quiz'>
          <a title='quiz'>QUIZ</a>
        </Link>
        <Link href='/#faq'>
          <a title='faq'>FAQ</a>
        </Link>
        {/* <Link href='/'>
          <a className='disabled' title='post'>
            POST
          </a>
        </Link> */}
        <Link href='/teoria'>
          <a title='teoria'>TEORIA</a>
        </Link>

        <span></span>
        <a
          aria-label='Tiktok link'
          target='_blank'
          href='https://www.tiktok.com/@patenteragazzi?_d=secCgsIARCbDRgBIAMoARI%2BCjwsj44V9oynClqip6A4ZSRxXQ7IMbrbj0dcklcqsrDMDvXA6SQeKXZUJJ6Jvd9mYItFThRf0RLwXwuGhlsaAA%3D%3D&language=en&sec_uid=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&sec_user_id=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&share_app_name=musically&share_author_id=6870055060148929542&share_link_id=304e3355-7227-4486-b53c-9ad57578e237&timestamp=1599646252&u_code=deb73gifajfmm5&user_id=6870055060148929542&utm_campaign=client_share&utm_medium=android&utm_source=copy&source=h5_m'
          rel='noopener noreferrer'
          aria-label='Tiktok'
          className='social'
          title='Tiktok'
        >
          <Image src='/tiktok.svg' alt='Tiktok' width={22} height={22} />
        </a>
        <a
          aria-label='Instagram'
          href='https://www.instagram.com/patenteragazzi/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'
          className='social'
          title='Instagram'
        >
          <Image src='/instagram.svg' alt='Instagram' width={25} height={25} />
        </a>
        <span></span>
        {!user && <div onClick={login}>Accedi</div>}
        {user && user.picture && (
          <Image
            src={user.picture}
            alt='Instagram'
            width={40}
            height={40}
            onClick={logout}
            className='profile_image'
          />
        )}
      </div>
      <div className='index_navbar_hamburger' onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default IndexNavbar;
