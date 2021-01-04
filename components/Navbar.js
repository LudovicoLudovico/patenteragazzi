import React, { useState } from 'react';
import { useUser } from '../context/userContext';
import Image from 'next/image';
import Link from 'next/link';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import useDarkMode from 'use-dark-mode';
const Navbar = ({ isAdminNav, active }) => {
  const darkMode = useDarkMode(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (!isOpen) {
      document.querySelector('.menu').classList += ' open';
      document.querySelector('.navbar_hamburger').classList += ' open';
      setIsOpen(true);
    } else {
      document.querySelector('.menu').classList = 'menu';
      document.querySelector('.navbar_hamburger').classList =
        'navbar_hamburger';
      setIsOpen(false);
    }
  };

  const { loadingUser, user, login, logout } = useUser();

  return (
    <div className='navbar'>
      <div className='container-full'>
        <div className='logo'>
          <img src='/patenteragazzi.png' alt='Logo' />
          <h1>Patenteragazzi</h1>
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
              <Link href='/#faq'>
                <a className='disabled'>FAQ</a>
                {/* className={active == 'faq' ? 'active' : ''} */}
              </Link>
              <Link href='/post'>
                <a className='disabled'>POST</a>
                {/* className={active == 'post' ? 'active' : ''} */}
              </Link>
              <Link href='/teoria'>
                <a className={active == 'teoria' ? 'active' : ''}>TEORIA</a>
              </Link>
              {/* <Brightness4Icon
                onClick={darkMode.value ? darkMode.disable : darkMode.enable}
              /> */}
              <span></span>
              <a
                aria-label='Tiktok link'
                target='_blank'
                href='https://www.tiktok.com/@patenteragazzi?_d=secCgsIARCbDRgBIAMoARI%2BCjwsj44V9oynClqip6A4ZSRxXQ7IMbrbj0dcklcqsrDMDvXA6SQeKXZUJJ6Jvd9mYItFThRf0RLwXwuGhlsaAA%3D%3D&language=en&sec_uid=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&sec_user_id=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&share_app_name=musically&share_author_id=6870055060148929542&share_link_id=304e3355-7227-4486-b53c-9ad57578e237&timestamp=1599646252&u_code=deb73gifajfmm5&user_id=6870055060148929542&utm_campaign=client_share&utm_medium=android&utm_source=copy&source=h5_m'
                rel='noopener noreferrer'
                aria-label='Tiktok'
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
                aria-label='Instagram'
                href='https://www.instagram.com/patenteragazzi/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
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
              <Link href='/'>
                <a>HOME</a>
              </Link>
              <Link href='/admin'>
                <a className={active == 'immagini' ? 'active' : ''}>IMMAGINI</a>
              </Link>

              <Link href='/admin/theory'>
                <a className={active == 'teoria' ? 'active' : ''}>TEORIA</a>
              </Link>

              <Link href='/admin/questions'>
                <a className={active == 'domande' ? 'active' : ''}>DOMANDE</a>
              </Link>

              <Link href='/admin/post'>
                <a className={active == 'post' ? 'active' : ''}>POST</a>
              </Link>
              <span></span>
              <a
                aria-label='Tiktok link'
                target='_blank'
                href='https://www.tiktok.com/@patenteragazzi?_d=secCgsIARCbDRgBIAMoARI%2BCjwsj44V9oynClqip6A4ZSRxXQ7IMbrbj0dcklcqsrDMDvXA6SQeKXZUJJ6Jvd9mYItFThRf0RLwXwuGhlsaAA%3D%3D&language=en&sec_uid=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&sec_user_id=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&share_app_name=musically&share_author_id=6870055060148929542&share_link_id=304e3355-7227-4486-b53c-9ad57578e237&timestamp=1599646252&u_code=deb73gifajfmm5&user_id=6870055060148929542&utm_campaign=client_share&utm_medium=android&utm_source=copy&source=h5_m'
                rel='noopener noreferrer'
                aria-label='Tiktok'
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
                aria-label='Instagram'
                href='https://www.instagram.com/patenteragazzi/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
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
    // <div className='navbar'>
    //   <div className='container'>
    //     <div className='navbar_image'>
    //       <div className='div_navbar_image'>
    //         <Image
    //           src='/patenteragazzi.png'
    //           alt='Logo patenteragazzi'
    //           layout={'intrinsic'}
    //           width={500}
    //           height={500}
    //         />
    //       </div>

    //       <div className='navbar_img_background'></div>
    //     </div>

    //     <h1 className='navbar_title'>Patenteragazzi</h1>

    //     <div className='navbar_hamburger' onClick={openMenu}>
    //       <span></span>
    //       <span></span>
    //       <span></span>
    //     </div>

    //     <div className='navbar_menu'>
    //       {!isAdminNav && (
    //         <>
    //           <button>
    //             <Link href='/'>
    //               <a>HOME</a>
    //             </Link>
    //           </button>
    //           <button>
    //             <Link href='/quiz'>
    //               <a>QUIZ</a>
    //             </Link>
    //           </button>
    //           <button>
    //             <Link href='/quiz-argomenti'>
    //               <a>QUIZ ARGOMENTI</a>
    //             </Link>
    //           </button>
    //           <button>
    //             <Link href='/teoria'>
    //               <a>TEORIA</a>
    //             </Link>
    //           </button>
    //         </>
    //       )}

    //       {isAdminNav && (
    //         <>
    //           <button>
    //             <Link href='/admin'>
    //               <a>IMMAGINI</a>
    //             </Link>
    //           </button>
    //           <button>
    //             <Link href='/admin/theory'>
    //               <a>TEORIA</a>
    //             </Link>
    //           </button>
    //           <button>
    //             <Link href='/admin/questions'>
    //               <a>DOMANDE</a>
    //             </Link>
    //           </button>
    //           <button>
    //             <Link href='/admin/post'>
    //               <a>POST</a>
    //             </Link>
    //           </button>
    //         </>
    //       )}

    //       <span></span>

    //       <button aria-label='Tiktok link'>
    //         <a
    //           target='_blank'
    //           href='https://www.tiktok.com/@patenteragazzi?_d=secCgsIARCbDRgBIAMoARI%2BCjwsj44V9oynClqip6A4ZSRxXQ7IMbrbj0dcklcqsrDMDvXA6SQeKXZUJJ6Jvd9mYItFThRf0RLwXwuGhlsaAA%3D%3D&language=en&sec_uid=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&sec_user_id=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&share_app_name=musically&share_author_id=6870055060148929542&share_link_id=304e3355-7227-4486-b53c-9ad57578e237&timestamp=1599646252&u_code=deb73gifajfmm5&user_id=6870055060148929542&utm_campaign=client_share&utm_medium=android&utm_source=copy&source=h5_m'
    //           rel='noopener noreferrer'
    //           aria-label='Tiktok'
    //         >
    //           <Image
    //             src='/tiktok.svg'
    //             alt='Tiktok'
    //             layout={'intrinsic'}
    //             width={22}
    //             height={22}
    //           />
    //         </a>
    //       </button>
    //       <button aria-label='Instagram'>
    //         <a
    //           href='https://www.instagram.com/patenteragazzi/'
    //           target='_blank'
    //           rel='noopener noreferrer'
    //           aria-label='Instagram'
    //         >
    //           <Image
    //             src='/instagram.svg'
    //             alt='Instagram'
    //             layout={'intrinsic'}
    //             width={25}
    //             height={25}
    //           />
    //         </a>
    //       </button>

    //       <span></span>
    //       {!user && <button onClick={login}>Accedi</button>}
    //       {user && (
    //         <button onClick={logout} aria-label='Profilo'>
    //           {user.picture && (
    //             <Image
    //               src={user.picture}
    //               alt='Instagram'
    //               layout={'intrinsic'}
    //               width={40}
    //               height={40}
    //               className='profile_image'
    //             />
    //           )}
    //           {!user.picture && <>Esci</>}
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;
