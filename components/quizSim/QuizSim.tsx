import React from 'react';
import '../../style/quizSim.min.css';

import QuizSimNav from './QuizSimNav';
import QuizSimBottom from './QuizSimBottom';
import QuizSimComp from './QuizSimComp';
import Link from 'next/link';

const QuizSim = ({
  questionCounter,
  setQuestionCounter,
  quizQuestions,
  getAnswer,
  correct,
}) => {
  return (
    <div className='quiz-sim'>
      <div className='quiz-sim_container'>
        <QuizSimNav
          questionCounter={questionCounter}
          setQuestionCounter={(id) => setQuestionCounter(parseInt(id))}
          quizQuestions={quizQuestions}
        />
        {quizQuestions.map((question, index) => {
          return (
            <QuizSimComp
              key={index}
              index={index}
              questionCounter={questionCounter}
              question={question}
              getTrueAnswer={() => {
                getAnswer(index, true);
              }}
              getFalseAnswer={() => {
                getAnswer(index, false);
              }}
            />
          );
        })}
        <QuizSimBottom
          forceCorrect={() => correct(false)}
          setQuestionCounter={(e) => setQuestionCounter(e)}
          questionCounter={questionCounter}
        />
        <br />

        <div className='quiz-sim_bottom_bottom'>
          <Link href='/'>
            <a>Torna alla home</a>
          </Link>

          <div className='quiz-sim_correct' onClick={() => correct(true)}>
            Correggi
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSim;
