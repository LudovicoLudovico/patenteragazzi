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
import slugify from 'slugify';

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
        <div
          key={slugify(`${quizQuestions[0].question}${0}`, { lower: true })}
          className={`quiz_content ${0 == questionCounter ? 'active' : ''} ${
            quizQuestions[0].image ? 'image' : 'no-image'
          }`}
        >
          <QuizCompFirst
            key={0}
            question={quizQuestions[0]}
            getTrueAnswer={() => {
              getAnswer(0, true);
            }}
            getFalseAnswer={() => {
              getAnswer(0, false);
            }}
          />
        </div>

        {quizQuestions.map((question, index: number) => {
          if (index !== 0) {
            return (
              <div
                key={slugify(`${question.question}${index}`, { lower: true })}
                className={`quiz_content ${
                  index == questionCounter ? 'active' : ''
                } ${question.image ? 'image' : 'no-image'}`}
              >
                <QuizComp
                  key={index}
                  question={question}
                  getAnswer={getAnswer}
                  index={index}
                />
              </div>
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
