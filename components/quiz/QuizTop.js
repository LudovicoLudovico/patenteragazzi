import React from 'react';
import Timer from 'react-compound-timer';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const QuizTop = ({ correct }) => {
  return (
    <div className='quiz_top'>
      <div className='quiz_timer'>
        {/* Timer */}
        {/* Timer value should be  1800000 (30:00) */}
        <Timer
          initialTime={1800000}
          startImmediately={true}
          direction='backward'
          checkpoints={[
            {
              time: 0,
              callback: () => correct(),
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

      {/* Top right section of the quiz, contains correct btn and close btn */}
      <div className='quiz_top_right'>
        <Button variant='contained' className='correct_btn' onClick={correct}>
          Correggi
        </Button>

        <Link href='/'>
          <a style={{ textDecoration: 'none' }}>
            <Button className='close_quiz'>Esci</Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default QuizTop;
