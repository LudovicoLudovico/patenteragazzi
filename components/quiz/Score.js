import React, { useState } from 'react';
import WrongAnswer from './WrongAnswer';
import Link from 'next/link';
import '../../style/score.min.css';
import dynamic from 'next/dynamic';
const AdBanner = dynamic(() => import('../AdBanner'), {
  ssr: false,
});

const Score = ({
  showScore,
  score,
  wrongAnswers,
  theory,
  answers,
  quizQuestions,
}) => {
  const [isActive, setIsActive] = useState(0);
  return (
    <>
      {showScore && (
        <div className='score'>
          <div className='score_top'>
            <div>
              <h1>
                <p>Risultato</p> {score}/40 -
                {score >= 36 ? 'Promosso' : 'Bocciato'}
              </h1>
            </div>

            <Link href='/'>
              <a>
                <button className='close_quiz'>x</button>
              </a>
            </Link>
          </div>

          <div className='separator'></div>
          <div className='score_nav'>
            <div
              onClick={() => setIsActive(0)}
              className={`${isActive == 0 ? 'active' : ''}`}
            >
              Risposte sbagliate
            </div>
            <div
              onClick={() => setIsActive(1)}
              className={`${isActive == 1 ? 'active' : ''}`}
            >
              Risposte non date
            </div>
            <div
              onClick={() => setIsActive(2)}
              className={`${isActive == 2 ? 'active' : ''}`}
            >
              Tutte le domande
            </div>
          </div>

          <div className='wrong_answer_container'>
            {isActive == 0 && (
              <>
                {wrongAnswers.map((wrong, index) => {
                  return (
                    <WrongAnswer
                      key={index}
                      wrong={wrong}
                      index={index}
                      isAllQuestions={false}
                      answers={answers}
                      theory={theory.filter((theory) => {
                        return theory.id == wrong.answer;
                      })}
                    />
                  );
                })}
              </>
            )}
            {isActive == 1 && (
              <>
                {wrongAnswers
                  .filter((wrongItem) => wrongItem.userResponse == null)
                  .map((wrong, index) => {
                    return (
                      <WrongAnswer
                        key={index}
                        wrong={wrong}
                        index={index}
                        answers={answers}
                        isAllQuestions={false}
                        theory={theory.filter((theory) => {
                          return theory.id == wrong.answer;
                        })}
                      />
                    );
                  })}
              </>
            )}

            {isActive == 2 && (
              <>
                {quizQuestions.map((wrong, index) => {
                  return (
                    <WrongAnswer
                      key={index}
                      index={index}
                      wrong={wrong}
                      isAllQuestions={true}
                      answers={answers}
                      theory={theory.filter((theory) => {
                        return theory.id == wrong.answer;
                      })}
                    />
                  );
                })}
              </>
            )}
          </div>

          <div className='score_banner'>
            <AdBanner />
          </div>
        </div>
      )}
    </>
  );
};

export default Score;
