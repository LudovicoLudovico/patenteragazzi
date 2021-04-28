import React, { useState, useEffect } from 'react';
import WrongAnswer from './WrongAnswer';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import '../../style/score.min.css';
import dynamic from 'next/dynamic';

const AdBanner = dynamic(() => import('../general/AdBanner'), {
  ssr: false,
});

interface ScoreProps {
  showScore: boolean;
  score: number;
  wrongAnswers: Wrong[];
  theory: Theory[];
  answers: boolean[];
  quizQuestions: QuizQuestions[];
}

interface QuizQuestions {
  answer: string;
  category: string;
  image?: string;
  question: string;
  questionId: string;
  response: boolean;
}
interface Theory {
  id: string;
  category: string;
  image?: string;
  slug: string;
  theory: string;
  title: string;
}

interface Wrong {
  answer: string;
  category: string;
  image: string;
  num?: number;
  question: string;
  questionId: string;
  response: boolean;
  userResponse?: boolean;
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

  useEffect(() => {
    const quizContainer = document.getElementById('score');
    quizContainer.style.height = `${window.innerHeight}px`;
  }, [window.innerHeight]);

  return (
    <>
      {showScore && (
        <div className='score' id='score'>
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
