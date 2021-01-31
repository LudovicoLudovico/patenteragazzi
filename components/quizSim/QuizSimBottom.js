import React from 'react';
import Timer from 'react-compound-timer';

const QuizSimBottom = ({
  forceCorrect,
  setQuestionCounter,
  questionCounter,
}) => {
  return (
    <div className='quiz-sim_bottom'>
      <div className='quiz-sim_timer'>
        <p>Tempo a disposizione</p>
        {/* Timer */}
        {/* Timer value should be  1800000 (30:00) */}
        <Timer
          initialTime={1800000}
          startImmediately={true}
          direction='backward'
          checkpoints={[
            {
              time: 0,
              callback: () => forceCorrect(),
            },
          ]}
        >
          <Timer.Minutes
            formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
          />
          :
          <Timer.Seconds
            formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
          />
        </Timer>
      </div>

      <div className='quiz-sim_bottom_right'>
        <div className='quiz-sim_prev'>
          <img
            src='/sim-arrow.svg'
            alt=''
            onClick={() => {
              if (questionCounter !== 0) {
                setQuestionCounter(questionCounter - 1);
              }
            }}
          />
          <img
            src='/sim-arrow.svg'
            alt=''
            onClick={() => {
              if (questionCounter !== 39) {
                setQuestionCounter(questionCounter + 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizSimBottom;
