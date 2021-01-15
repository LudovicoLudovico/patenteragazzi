import React, { useEffect } from 'react';

const AdBanner = (props) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [props.currentPath]);

  return (
    <>
      <ins
        className='adsbygoogle'
        style={{
          display: 'inline-block',
          width: '100%',
          height: 90,
        }}
        data-ad-client='ca-pub-7942078481061905'
        data-ad-slot='5732008523'
      ></ins>
    </>
  );
};

export default AdBanner;
