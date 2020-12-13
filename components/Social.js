import React from 'react';

const Social = () => {
  return (
    <div className='social'>
      <h2>I nostri social</h2>

      <div className='social_container'>
        <div className='red social_bar'></div>
        <div className='blue1 social_bar'>
          <a
            href='https://www.instagram.com/patenteragazzi/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Instagram'
          >
            <img src='/instagram.svg' alt='' />
          </a>
        </div>

        <div className='social_content'>
          <div>UNISCITI</div>
          <div>AD UNA COMMUNITY</div>
          <div>
            DI OLTRE <span className='colored'>6000 STUDENTI</span>
          </div>
        </div>
        <div className='blue2 social_bar'>
          <a
            target='_blank'
            href='https://www.tiktok.com/@patenteragazzi?_d=secCgsIARCbDRgBIAMoARI%2BCjwsj44V9oynClqip6A4ZSRxXQ7IMbrbj0dcklcqsrDMDvXA6SQeKXZUJJ6Jvd9mYItFThRf0RLwXwuGhlsaAA%3D%3D&language=en&sec_uid=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&sec_user_id=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&share_app_name=musically&share_author_id=6870055060148929542&share_link_id=304e3355-7227-4486-b53c-9ad57578e237&timestamp=1599646252&u_code=deb73gifajfmm5&user_id=6870055060148929542&utm_campaign=client_share&utm_medium=android&utm_source=copy&source=h5_m'
            rel='noopener noreferrer'
            aria-label='Tiktok'
          >
            <img src='/tiktok.svg' alt='' />
          </a>
        </div>
        <div className='green social_bar'>
          <a href='mailto:patenteragazzi@gmail.com'>
            <img src='/mail.svg' alt='' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
