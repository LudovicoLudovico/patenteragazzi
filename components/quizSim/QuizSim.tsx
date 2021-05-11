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
        <QuizSimCompFirst
          key={0}
          index={0}
          questionCounter={questionCounter}
          question={quizQuestions[0]}
          getTrueAnswer={() => {
            getAnswer(0, true);
          }}
          getFalseAnswer={() => {
            getAnswer(0, false);
          }}
        />

        {quizQuestions.map((question, index: number) => {
          if (index !== 0) {
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
