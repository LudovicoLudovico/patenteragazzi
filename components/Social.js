import React from 'react';

const Social = () => {
  return (
    <div className='social'>
      <h2>I nostri social</h2>

      <div className='social_container'>
        <div className='red social_bar'></div>
        <div className='blue1 social_bar'>
          <a href=''>
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
          <a href=''>
            <img src='/tiktok.svg' alt='' />
          </a>
        </div>
        <div className='green social_bar'>
          <a href=''>
            <img src='/mail.svg' alt='' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
