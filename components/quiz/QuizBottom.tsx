import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

interface QuizBottomProps {
  questionCounter: number;
  setQuestionCounter: (number: number) => void;
  quizQuestions: any[];
}

const QuizBottom = ({
  quizQuestions,
  questionCounter,
  setQuestionCounter,
}: QuizBottomProps) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [navDisp, setNavDisp] = useState(5);

  useEffect(() => {
    setWidth(window.innerWidth);

    if (width < 500) {
      setNavDisp(3);
    } else {
      setNavDisp(5);
    }
  }, [window.innerWidth]);

  useEffect(() => {
    window.scrollTo(0, 90);
  }, []);
  return (
    <div className='quiz_bottom'>
      <nav className='quiz_bottom_menu' onClick={(e) => {}}>
        {quizQuestions.map((question, index) => {
          return (
            <div
              className={`quiz_nav_menu_item ${
                questionCounter === index ? 'active' : ''
              }
                          ${
                            questionCounter - navDisp < index &&
                            index < questionCounter + navDisp
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
      </nav>

      {/* Buttons for moving  */}
      <div className='quiz_nav_small'>
        <Button
          variant='contained'
          className='quiz_nav_btn'
          onClick={() => {
            if (questionCounter - 1 !== -1) {
              setQuestionCounter(questionCounter - 1);
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
              setQuestionCounter(questionCounter + 1);
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
