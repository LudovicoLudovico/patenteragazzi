import React, { useState } from 'react';
import { Modal, Button } from '@material-ui/core';
import slugify from 'slugify';
import firebase from 'firebase/app';
import WarningIcon from '@material-ui/icons/Warning';
import uuid from 'react-uuid';

const QuizComp = ({
  questionCounter,
  index,
  question,
  getTrueAnswer,
  getFalseAnswer,
}) => {
  const [open, setOpen] = useState(false);
  const [canReport, setCanReport] = useState(true);

  const setProblem = () => {
    firebase
      .firestore()
      .collection('problems')
      .add({
        type: 'question',
        question: question.question,
        category: question.category,
        image: question.image,
        answer: question.answer,
        response: question.response,
      })
      .then(() => {
        setCanReport(false);
      });
  };

  return (
    <>
      <Button
        className={`quiz_problem  ${index == questionCounter ? 'active' : ''}`}
        onClick={setProblem}
        disabled={!canReport}
        variant='contained'
        style={{
          background: 'red',
          color: 'white',
        }}
      >
        <p>Segnala domanda</p>
        <WarningIcon />
      </Button>
      <div
        key={slugify(`${question.question}${index}`, { lower: true })}
        className={`quiz_content ${index == questionCounter ? 'active' : ''} ${
          question.image ? 'image' : 'no-image'
        }`}
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
    </>
  );
};

export default QuizComp;
