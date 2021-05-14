import { useState, memo } from 'react';
import { Modal, Button } from '@material-ui/core';

interface QuizCompProps {
  question: Question;
  getAnswer: (index: any, answer: any, isSim: boolean) => void;
  index: number;
}

interface Question {
  question: string;
  image?: string;
}
const QuizComp = memo(({ question, getAnswer, index }: QuizCompProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='quiz_image'>
        {question.image ? (
          <>
            <Modal
              open={open}
              onClick={() => setOpen(false)}
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                outline: 'none',
              }}
            >
              <img
                src={question.image}
                alt=''
                className='modal_img'
                style={{
                  boxSizing: 'border-box',
                  height: 'auto',
                  width: '100%',
                  maxWidth: 700,
                  padding: 20,
                  margin: 10,
                  border: '5px solid white',
                  borderRadius: 20,
                  background: '#00408b',
                  outline: 'none',
                }}
              />
            </Modal>

            <img
              onClick={() => setOpen(true)}
              src={question.image}
              alt='Caricamento...'
            />
          </>
        ) : (
          <div className='modal_img'></div>
        )}
      </div>

      {/* Question */}
      <div className='quiz_question'>
        <p>
          {question.question.charAt(0).toUpperCase() +
            question.question.slice(1)}
        </p>
      </div>

      {/* Buttons for answering */}
      <div className='quiz_answer'>
        <Button
          variant='contained'
          className='quiz_answer_btn'
          onClick={() => getAnswer(index, true, false)}
        >
          Vero
        </Button>
        <Button
          variant='contained'
          className='quiz_answer_btn'
          onClick={() => getAnswer(index, false, false)}
        >
          Falso
        </Button>
      </div>
    </>
  );
});

export default memo(QuizComp);
