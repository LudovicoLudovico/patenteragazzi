import dynamic from 'next/dynamic';

// Components
const QuizComp = dynamic(() => import('./QuizComp'));
import QuizCompFirst from './QuizCompFirst';
import QuizTop from './QuizTop';
import QuizBottom from './QuizBottom';

// Styling
import '../../style/quiz.min.css';

// Types
import { Question } from '../../interfaces';

interface QuizProps {
  correct: (performCheck: boolean) => void;
  questionCounter: number;
  quizQuestions: Question[];
  getAnswer: (index: any, answer: any) => void;
  setQuestionCounter: (number: number) => void;
}

const quiz = ({
  correct,
  questionCounter,
  quizQuestions,
  getAnswer,
  setQuestionCounter,
}: QuizProps) => {
  return (
    <div
      className='quiz'
      id='quiz'
      style={{ height: `${window.innerHeight}px` }}
    >
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

        {quizQuestions.map((question, index: number) => {
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
          } else {
            return;
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
