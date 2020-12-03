import React from 'react';
import Button from '@material-ui/core/Button';

const QuizBottom = ({ quizQuestions, questionCounter, setQuestionCounter }) => {
  return (
    <div className='quiz_bottom'>
      <div className='quiz_bottom_menu' onClick={(e) => {}}>
        {quizQuestions.map((question, index) => {
          return (
            <div
              className={`quiz_nav_menu_item ${
                questionCounter === index ? 'active' : ''
              }
                          ${
                            questionCounter - 5 < index &&
                            index < questionCounter + 5
                              ? 'visible'
                              : ''
                          }
                          `}
              onClick={() => {
                setQuestionCounter(index);
              }}
              key={index}
            >
              {index + 1}
            </div>
          );
        })}
      </div>

      {/* Buttons for moving  */}
      <div className='quiz_nav_small'>
        <Button
          variant='contained'
          className='quiz_nav_btn'
          onClick={() => {
            if (questionCounter - 1 !== -1) {
              setQuestionCounter((prevState) => prevState - 1);
            }
          }}
        >
          Precedente
        </Button>
        <Button
          variant='contained'
          className='quiz_nav_btn'
          onClick={() => {
            if (questionCounter + 1 !== quizQuestions.length) {
              setQuestionCounter((prevState) => prevState + 1);
            }
          }}
        >
          Successiva
        </Button>
      </div>
    </div>
  );
};

export default QuizBottom;
