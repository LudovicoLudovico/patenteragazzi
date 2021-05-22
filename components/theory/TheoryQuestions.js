import { decrypt } from '../../lib/enc';

const TheoryQuestions = ({ questions }) => {
  return (
    <div className='theory_questions'>
      <div className='theory_questions_table'>
        {questions.map((question) => {
          return (
            <div className='theory_questions_item' key={question.id}>
              <div>{decrypt(question.question)}</div>
              <p
                className={`theory_questions_item_response  ${
                  question.response ? 'true' : 'false'
                }`}
              >
                {question.response ? 'Vero' : 'Falso'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TheoryQuestions;
