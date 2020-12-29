import React from 'react';
import WrongAnswer from './WrongAnswer';
import Link from 'next/link';

const Score = ({ score, wrongAnswers, theory }) => {
  return (
    <div className='score'>
      <div className='score_top'>
        <div>
          <h1>
            Risultato {score}/40 -
            {score >= 36 ? '    Promosso' : '    Bocciato'}
          </h1>
        </div>

        <Link href='/'>
          <a>
            <button className='close_quiz'>x</button>
          </a>
        </Link>
      </div>

      <div className='separator'></div>
      <div className='wrong_answer_container'>
        {wrongAnswers.map((wrong, id) => {
          return (
            <WrongAnswer
              wrong={wrong}
              key={id}
              theory={theory.filter((theory) => {
                return theory.id == wrong.answer;
              })}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Score;
