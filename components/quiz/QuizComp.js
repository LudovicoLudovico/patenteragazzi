import React, { useState } from 'react';
import { Modal, Button } from '@material-ui/core';

const QuizComp = ({ questionCounter, index, question }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      key={index}
      className={`quiz_content ${question.image ? 'image' : 'no-image'} ${
        index == questionCounter ? 'active' : ''
      }`}
    >
      <div
        className={`quiz_content_wrap ${question.image ? 'image' : 'no-image'}`}
      >
        <div className='quiz_image'>
          {question.image && (
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
                    height: '70%',
                    maxHeight: '100vw',
                    width: 'auto',
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
          )}
        </div>
        <div className='quiz_question'>
          <p>
            {question.question.charAt(0).toUpperCase() +
              question.question.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizComp;
