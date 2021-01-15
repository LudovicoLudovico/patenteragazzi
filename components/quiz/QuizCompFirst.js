import React, { useState } from 'react';
import { Modal, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import slugify from 'slugify';
import firebase from 'firebase/app';
import WarningIcon from '@material-ui/icons/Warning';

const QuizComp = ({
  questionCounter,
  index,
  question,
  getTrueAnswer,
  getFalseAnswer,
}) => {
  const [open, setOpen] = useState(false);
  const [canReport, setCanReport] = useState(true);
  const [hasProblemImage, setHasProblemImage] = useState(false);
  const [hasProblemQuestion, setHasProblemQuestion] = useState(false);
  const [hasProblemAnswer, setHasProblemAnswer] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const setProblem = () => {
    firebase
      .firestore()
      .collection('problems')
      .add({
        type: 'question',
        question: question.question,
        questionId: question.questionId,
        category: question.category,
        image: question.image,
        answer: question.answer,
        response: question.response,
        hasProblemImage,
        hasProblemQuestion,
        hasProblemAnswer,
      })
      .then(() => {
        setOpenModal(false);
        setCanReport(false);
      });
  };

  const reportPopup = (
    <div
      className='report_popup'
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'white',
        padding: 20,
        width: '100%',
        height: '50%',
        maxWidth: 500,
        maxHeight: 300,
      }}
    >
      <h2>Segnale errore nella domanda:</h2>
      <FormControlLabel
        control={
          <Checkbox
            name='image'
            checked={hasProblemImage}
            onChange={() => {
              setHasProblemImage(!hasProblemImage);
            }}
          />
        }
        label='Immagine'
      />
      <FormControlLabel
        control={
          <Checkbox
            name='question'
            checked={hasProblemQuestion}
            onChange={() => {
              setHasProblemQuestion(!hasProblemQuestion);
            }}
          />
        }
        label='Domanda'
      />
      <FormControlLabel
        control={
          <Checkbox
            name='answer'
            checked={hasProblemAnswer}
            onChange={() => {
              setHasProblemAnswer(!hasProblemAnswer);
            }}
          />
        }
        label='Risposta'
      />

      <br />
      <br />

      <Button
        className={`quiz_problem  ${index == questionCounter ? 'active' : ''}`}
        onClick={setProblem}
        disabled={!canReport}
        variant='contained'
        aria-label={`Conferma Domanda Numero ${index + 1}`}
        style={{
          background: 'red',
          color: 'white',
        }}
      >
        <p>Invia segnalazione</p>
        <WarningIcon style={{ marginLeft: 20 }} />
      </Button>
    </div>
  );
  return (
    <>
      <Button
        className={`quiz_problem  ${index == questionCounter ? 'active' : ''}`}
        onClick={() => setOpenModal(true)}
        disabled={!canReport}
        variant='contained'
        aria-label={`Segnala Domanda Numero ${index + 1}`}
        style={{
          background: 'red',
          color: 'white',
        }}
      >
        <p>Segnala domanda</p>
        <WarningIcon />
      </Button>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='Segnalazione errore domanda'
        aria-describedby='Puoi segnalarci un errore nella domanda'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          outline: 'none',
        }}
      >
        {reportPopup}
      </Modal>

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
