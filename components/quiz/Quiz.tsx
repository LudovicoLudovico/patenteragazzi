import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import QuizCompFirst from './QuizCompFirst';

const QuizComp = dynamic(() => import('./QuizComp'));
import QuizBottom from './QuizBottom';
import QuizTop from './QuizTop';
import '../../style/quiz.min.css';

const quiz = ({
  correct,
  questionCounter,
  quizQuestions,
  getAnswer,
  setQuestionCounter,
}) => {
  useEffect(() => {
    const quizContainer = document.getElementById('quiz');
    quizContainer.style.height = `${window.innerHeight}px`;
  }, [window.innerHeight]);
  return (
    <div className='quiz' id='quiz'>
      <div className='standard_quiz'>
        <QuizTop
          correct={() => correct(true)}
          questionCounter={questionCounter}
          quizQuestions={quizQuestions}
        />
        <QuizCompFirst
          key={0}
          questionCounter={questionCounter}
          index={0}
          question={quizQuestions[0]}
          getTrueAnswer={() => {
            getAnswer(0, true);
          }}
          getFalseAnswer={() => {
            getAnswer(0, false);
          }}
        />
        {quizQuestions.map((question, index) => {
          if (index !== 0) {
            return (
              <QuizComp
                key={index}
                questionCounter={questionCounter}
                index={index}
                question={question}
                getTrueAnswer={() => {
                  getAnswer(index, true);
                }}
                getFalseAnswer={() => {
                  getAnswer(index, false);
                }}
              />
            );
          }
        })}

        <QuizBottom
          questionCounter={questionCounter}
          quizQuestions={quizQuestions}
          setQuestionCounter={(index) => setQuestionCounter(index)}
        />
      </div>
    </div>
  );
};
export default quiz;
