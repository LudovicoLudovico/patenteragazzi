import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useUser } from '../context/userContext';
import Link from 'next/link';

const QuizHero = () => {
  const { user, login } = useUser();
  const [loading, setLoading] = useState(false);

  return (
    <div className='quiz_hero'>
      <div className='quiz_hero_buttons'>
        <Link href='/quiz'>
          <a>
            <Button
              variant='contained'
              onClick={(e) => {
                setLoading(true);
              }}
            >
              {!loading ? 'INIZIA QUIZ PATENTE A/B' : 'CARICAMENTO...'}
            </Button>
          </a>
        </Link>

        <Button variant='contained' disabled={true}>
          WORK IN PROGRESS
        </Button>

        <Link href='/quiz-argomenti'>
          <a>
            <Button
              variant='contained'
              style={{
                background: '#06690d',
              }}
              onClick={(e) => {
                setLoading(true);
              }}
            >
              {!loading ? 'INIZIA QUIZ ARGOMENTI (BETA)' : 'CARICAMENTO...'}
            </Button>
          </a>
        </Link>
      </div>
      <div className='quiz_hero_description'>
        <p>
          {!user && (
            <>
              <br />
              {!user && (
                <button className='quiz_hero_signup' onClick={login}>
                  Accedi
                </button>
              )}
              <br />
              <br />
            </>
          )}
          Per ogni quiz avrai a disposizione <strong>30 minuti di tempo</strong>{' '}
          in cui dovrai svolgere <strong>40 domande</strong> con possibile
          risposta <br /> <br /> <span className='true'>VERO</span> o{' '}
          <span className='false'>FALSO</span>
          <br /> <br /> I quiz su errori e argomenti saranno disponibili a breve
        </p>
        <br />
      </div>
    </div>
  );
};

export default QuizHero;
