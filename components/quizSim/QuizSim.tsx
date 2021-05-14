// General imports
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { memo } from 'react';
// Components
import QuizSimNav from './QuizSimNav';
import QuizSimBottom from './QuizSimBottom';
import QuizSimCompFirst from './QuizSimCompFirst';
const QuizSimComp = dynamic(() => import('./QuizSimComp'));

// Styling
import '../../style/quizSim.min.css';

// Functional component
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
        <div className={`quiz-sim_box ${questionCounter == 0 ? 'active' : ''}`}>
          <QuizSimCompFirst
            key={0}
            index={0}
            question={quizQuestions[0]}
            getAnswer={getAnswer}
          />
        </div>

        {quizQuestions.map((question, index: number) => {
          if (index !== 0) {
            return (
              <div
                className={`quiz-sim_box ${
                  questionCounter == index ? 'active' : ''
                }`}
              >
                <QuizSimComp
                  key={index}
                  question={question}
                  getAnswer={getAnswer}
                  index={index}
                />
              </div>
            );
          }
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

export default memo(QuizSim);
