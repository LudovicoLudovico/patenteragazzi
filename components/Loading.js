import React from 'react';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className='loading'>
      <Image
        src='/car.svg'
        alt='Caricamento'
        layout={'intrinsic'}
        width={150}
        height={150}
      />
      <p>Caricamento...</p>
    </div>
  );
};

export default Loading;
