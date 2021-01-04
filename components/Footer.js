import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container-full'>
        <p>Copryright 2020</p>
        <div className='footer_contact'>
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
          <a
            target='_blank'
            href='https://www.tiktok.com/@patenteragazzi?_d=secCgsIARCbDRgBIAMoARI%2BCjwsj44V9oynClqip6A4ZSRxXQ7IMbrbj0dcklcqsrDMDvXA6SQeKXZUJJ6Jvd9mYItFThRf0RLwXwuGhlsaAA%3D%3D&language=en&sec_uid=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&sec_user_id=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&share_app_name=musically&share_author_id=6870055060148929542&share_link_id=304e3355-7227-4486-b53c-9ad57578e237&timestamp=1599646252&u_code=deb73gifajfmm5&user_id=6870055060148929542&utm_campaign=client_share&utm_medium=android&utm_source=copy&source=h5_m'
            rel='noopener noreferrer'
          >
            <Image
              src='/tiktok.svg'
              alt='Tiktok'
              aria-label='Tiktok'
              layout={'intrinsic'}
              width={22}
              height={22}
            />
          </a>

          <a href='mailto:patenteragazzi@gmail.com' aria-label='Email'>
            <Image
              src='/mail.svg'
              alt='Email'
              layout={'intrinsic'}
              width={22}
              height={22}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
