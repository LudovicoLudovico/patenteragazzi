import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';

//Css import
import '../../style/indexHero.min.css';

const IndexHero = () => {
  const [loading, setLoading] = useState(false);
  const [loadingSim, setLoadingSim] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);
  return (
    <div className='index_hero'>
      <div className='index_hero_button'>
        <Link href='/quiz'>
          <a title='Quiz'>
            <Button
              variant='contained'
              onClick={(e) => {
                setLoading(true);
              }}
            >
              {!loading ? 'QUIZ PATENTE AM/B' : 'CARICAMENTO...'}
            </Button>
          </a>
        </Link>

        <Link href='/simulazione-quiz'>
          <a title='Quiz Simulazione Esame'>
            <Button
              variant='contained'
              style={{
                background: '#06690d',
              }}
              onClick={(e) => {
                setLoadingSim(true);
              }}
            >
              {!loadingSim ? "SIMULAZIONE QUIZ D'ESAME" : 'CARICAMENTO...'}
            </Button>
          </a>
        </Link>

        <Link href='/quiz-argomenti'>
          <a title='Quiz Su Argomenti'>
            <Button
              variant='contained'
              style={{
                background: '#b35600',
              }}
              onClick={(e) => {
                setLoadingTopics(true);
              }}
            >
              {!loadingTopics ? 'QUIZ ARGOMENTI' : 'CARICAMENTO...'}
            </Button>
          </a>
        </Link>
      </div>
      <p>
        Per ogni quiz avrai 30 minuti di tempo in cui dovrai rispondere a 40
        domande con risposta <br /> VERO o FALSO
      </p>
    </div>
  );
};

export default IndexHero;
