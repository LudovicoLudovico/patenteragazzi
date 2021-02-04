import React from 'react';
import uuid from 'react-uuid';

interface QuizSimNav {
  questionCounter: number;
  setQuestionCounter: (number: number) => void;
  quizQuestions: any[];
}
const QuizSimNav = ({ questionCounter, setQuestionCounter, quizQuestions }) => {
  const setCounterFunc = (event) => {
    if (event.target.id) {
      setQuestionCounter(parseInt(event.target.id));
    }
  };
  return (
    <div className='quiz-sim_nav'>
      <div className='quiz-sim_bigger' onClick={setCounterFunc}>
        <div
          id={'0'}
          className={` ${
            questionCounter >= 0 && questionCounter < 10 ? 'active' : ''
          }`}
        >
          Domande da 1 a 10
        </div>
        <div
          id={'10'}
          className={`${
            questionCounter >= 10 && questionCounter < 20 ? 'active' : ''
          }`}
        >
          Domande da 11 a 20
        </div>
        <div
          id={'20'}
          className={`${
            questionCounter >= 20 && questionCounter < 30 ? 'active' : ''
          }`}
        >
          Domande da 21 a 30
        </div>
        <div
          id={'30'}
          className={`${
            questionCounter >= 30 && questionCounter < 40 ? 'active' : ''
          }`}
        >
          Domande da 31 a 40
        </div>
      </div>

      <div className='quiz-sim_small' onClick={setCounterFunc}>
        {quizQuestions.map((index: number) => {
          return (
            <div
              key={uuid()}
              id={index.toString()}
              className={`${questionCounter == index ? 'active' : ''}
                    ${questionCounter < 10 && index < 10 ? 'display' : ''}
                    ${
                      questionCounter >= 10 &&
                      index >= 10 &&
                      questionCounter < 20 &&
                      index < 20
                        ? 'display'
                        : ''
                    }
                    ${
                      questionCounter >= 20 &&
                      index >= 20 &&
                      questionCounter < 30 &&
                      index < 30
                        ? 'display'
                        : ''
                    }
                    ${
                      questionCounter >= 30 &&
                      index >= 30 &&
                      questionCounter < 40 &&
                      index < 40
                        ? 'display'
                        : ''
                    }
                    
                    `}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      <div className='quiz-sim_smaller' onClick={setCounterFunc}>
        {quizQuestions.map((index: number) => {
          return (
            <div
              key={uuid()}
              id={index.toString()}
              className={`${questionCounter == index ? 'active' : ''}`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizSimNav;
