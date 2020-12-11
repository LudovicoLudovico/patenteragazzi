import React from 'react';
import Image from 'next/image';

const Cards = () => {
  return (
    <div className='cards_container'>
      <div className='card'>
        <p>
          Infiniti quiz con più di 7000 domande di teoria che ti aiuteranno a
          superare a occhi chiusi l'esame di teoria
        </p>
        <img src='/question.svg' alt='' />
      </div>
      <div className='card'>
        <p>
          Svolgi i quiz sulle domande che hai sbagliato in modo da colmare
          immediatamente le tue lacune
        </p>
        <img src='/hazard.svg' alt='' />
      </div>
      <div className='card'>
        <p>
          Svolgi quiz su argomenti specifici per affinare migliorare più
          velocemente negli argomenti più ostici
        </p>
        <img src='/search.svg' alt='' />
      </div>
    </div>
  );
};

export default Cards;
