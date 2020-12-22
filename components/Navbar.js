import React, { useState } from 'react';
import { useUser } from '../context/userContext';
import Image from 'next/image';

const Navbar = ({ isAdminNav }) => {
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
          {!isAdminNav && (
            <>
              <button>
                <a href='/quiz'> QUIZ</a>
              </button>
              <button>
                <a href='#stats'> STATISTICHE</a>
              </button>
              <button>
                <a href='#stats'> PREMIUM</a>
              </button>
            </>
          )}

          {isAdminNav && (
            <>
              <button>
                <a href='/admin'>IMMAGINI</a>
              </button>
              <button>
                <a href='/admin/theory'>TEORIA</a>
              </button>
              <button>
                <a href='/admin/questions'>DOMANDE</a>
              </button>
              <button>
                <a href='/admin/post'>POST</a>
              </button>
            </>
          )}

          <span></span>

          <button aria-label='Tiktok link'>
            <a
              target='_blank'
              href='https://www.tiktok.com/@patenteragazzi?_d=secCgsIARCbDRgBIAMoARI%2BCjwsj44V9oynClqip6A4ZSRxXQ7IMbrbj0dcklcqsrDMDvXA6SQeKXZUJJ6Jvd9mYItFThRf0RLwXwuGhlsaAA%3D%3D&language=en&sec_uid=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&sec_user_id=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&share_app_name=musically&share_author_id=6870055060148929542&share_link_id=304e3355-7227-4486-b53c-9ad57578e237&timestamp=1599646252&u_code=deb73gifajfmm5&user_id=6870055060148929542&utm_campaign=client_share&utm_medium=android&utm_source=copy&source=h5_m'
              rel='noopener noreferrer'
              aria-label='Tiktok'
            >
              <Image
                src='/tiktok.svg'
                alt='Tiktok'
                layout={'intrinsic'}
                width={22}
                height={22}
              />
            </a>
          </button>
          <button aria-label='Instagram'>
            <a
              href='https://www.instagram.com/patenteragazzi/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram'
            >
              <Image
                src='/instagram.svg'
                alt='Instagram'
                layout={'intrinsic'}
                width={25}
                height={25}
              />
            </a>
          </button>

          <span></span>
          {!user && <button onClick={login}>Accedi</button>}
          {user && (
            <button onClick={logout} aria-label='Profilo'>
              {user.picture && (
                <Image
                  src={user.picture}
                  alt='Instagram'
                  layout={'intrinsic'}
                  width={40}
                  height={40}
                  className='profile_image'
                />
              )}
              {!user.picture && <>Esci</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
