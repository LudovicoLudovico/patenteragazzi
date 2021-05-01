// General Imports
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import dynamic from 'next/dynamic';

// Components
import WrongAnswer from './WrongAnswer';
const AdBanner = dynamic(() => import('../general/AdBanner'), {
  ssr: false,
});

// Styling
import '../../style/score.min.css';

// Types
import { Question, Wrong, Theory } from '../../interfaces';

// Components Props
interface ScoreProps {
  showScore: boolean;
  score: number;
  wrongAnswers: Wrong[];
  theory: Theory[];
  answers: boolean[];
  quizQuestions: Question[];
}

const Score = ({
  showScore,
  score,
  wrongAnswers,
  theory,
  answers,
  quizQuestions,
}: ScoreProps) => {
  const [isActive, setIsActive] = useState(0);

  return (
    <>
      {showScore && (
        <div className='score' style={{ height: `${window.innerHeight}px` }}>
          <div className='score_content'>
            <div className='score_top'>
              <div className='score_top_left'>
                <h1>
                  <p>Risultato</p> {score}/40
                  <p>- {score >= 36 ? 'Promosso' : 'Bocciato'}</p>
                </h1>
                <Link href='/'>
                  <a style={{ textDecoration: 'none' }}>
                    <Button className='close_quiz'>ESCI</Button>
                  </a>
                </Link>
              </div>

              <div className='score_nav'>
                <div
                  onClick={() => setIsActive(0)}
                  className={`${isActive == 0 ? 'active' : ''}`}
                >
                  Sbagliate
                </div>
                <div
                  onClick={() => setIsActive(1)}
                  className={`${isActive == 1 ? 'active' : ''}`}
                >
                  Non date
                </div>
                <div
                  onClick={() => setIsActive(2)}
                  className={`${isActive == 2 ? 'active' : ''}`}
                >
                  Tutte
                </div>
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
