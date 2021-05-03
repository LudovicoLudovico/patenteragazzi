import React, { useState } from 'react';

interface QuizSimCompProps {
  index: number;
  questionCounter: number;
  question: Question;
  getTrueAnswer: () => void;
  getFalseAnswer: () => void;
}
interface Question {
  question: string;
  image: string | null;
}
const QuizSimComp = ({
  index,
  questionCounter,
  question,
  getTrueAnswer,
  getFalseAnswer,
}: QuizSimCompProps) => {
  const [answer, setAnswer] = useState<boolean>();
  return (
    <div className={`quiz-sim_box ${questionCounter == index ? 'active' : ''}`}>
      <div className='quiz-sim_box_image'>
        {question.image && <img src={question.image} alt='Caricamento...' />}
      </div>
      <div className='quiz-sim_box_question'>
        <p className='quiz-sim_box_question_num'>{index + 1}</p>
        <p className='quiz-sim_box_question_question'>
          {question.question.charAt(0).toUpperCase() +
            question.question.slice(1)}
        </p>
      </div>
      <div className='quiz-sim_box_answers'>
        <>
          <img
            src={` ${
              answer == null || answer == false
                ? '/true.svg'
                : '/true-crossed.svg'
            }`}
            alt=''
            onClick={() => {
              getTrueAnswer();
              setAnswer(true);
            }}
          />
          <img
            src={` ${
              answer == null || answer == true
                ? '/false.svg'
                : '/false-crossed.svg'
            }`}
            alt=''
            onClick={() => {
              getFalseAnswer();
              setAnswer(false);
            }}
          />
        </>
      </div>
    </div>
  );
};

export default QuizSimComp;