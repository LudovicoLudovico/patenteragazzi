import React from 'react';
import Button from '@material-ui/core/Button';
import { useUser } from '../context/userContext';
import Link from 'next/link';

const QuizHero = () => {
  const { user, login } = useUser();

  return (
    <div className='quiz_hero'>
      <>
        <div className='quiz_hero_buttons'>
          <Link href='/quiz'>
            <Button variant='contained'>INIZIA QUIZ PATENTE A/B</Button>
          </Link>

          <Button variant='contained'>INIZIA QUIZ ERRORI</Button>
          <Button variant='contained'>INIZIA QUIZ ARGOMENTI</Button>
        </div>
        <div className='quiz_hero_description'>
          <p>
            {!user && (
              <>
                <strong>
                  Per svolgere i quiz devi accedere. È facile, basta un click
                </strong>
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
            Per ogni quiz avrai a disposizione{' '}
            <strong>30 minuti di tempo</strong> in cui dovrai svolgere{' '}
            <strong>40 domande</strong> con possibile risposta <br /> <br />{' '}
            <span className='true'>VERO</span> o{' '}
            <span className='false'>FALSO</span>
            <br /> <br /> I quiz su errori e argomenti saranno disponibili a
            breve
          </p>
        </div>
      </>
    </div>
  );
};

export default QuizHero;
