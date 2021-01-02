import React, { useState } from 'react';
import { Modal, Button } from '@material-ui/core';

const QuizComp = ({
  questionCounter,
  index,
  question,
  getTrueAnswer,
  getFalseAnswer,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      key={index}
      className={`quiz_content ${index == questionCounter ? 'active' : ''}`}
    >
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

      <div className='quiz_right'>
        {/* Question */}
        <div className='quiz_question'>
          <p>{question.question}</p>
        </div>

        {/* Buttons for answering */}
        <div className='quiz_answer'>
          <Button
            variant='contained'
            className='quiz_answer_btn'
            onClick={getTrueAnswer}
          >
            Vero
          </Button>
          <Button
            variant='contained'
            className='quiz_answer_btn'
            onClick={getFalseAnswer}
          >
            Falso
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizComp;
