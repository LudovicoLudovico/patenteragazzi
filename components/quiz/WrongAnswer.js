import React, { useState } from 'react';
import { Modal, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { decrypt } from '../../lib/enc';
import MDEditor from '@uiw/react-md-editor';
import firebase from 'firebase/app';
import WarningIcon from '@material-ui/icons/Warning';

const WrongAnswer = ({ wrong, theory, answers, isAllQuestions, index }) => {
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
        question: wrong.question,
        questionId: wrong.questionId,
        category: wrong.category,
        image: wrong.image,
        answer: wrong.answer,
        response: wrong.response,
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
        className={`quiz_problem active`}
        onClick={setProblem}
        disabled={!canReport}
        variant='contained'
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
        className={`wrong_answer ${wrong.image ? 'image' : 'no-image'}`}
        style={{ position: 'relative' }}
      >
        <div className='wrong_answer_image'>
          {wrong.image && <img src={wrong.image} alt='' />}
        </div>
        {theory.length !== 0 && (
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              outline: 'none',
            }}
          >
            <div
              className='theory_popup'
              style={{
                backgroundColor: 'white',
                color: 'black',
                textAlign: 'center',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: 900,
                maxHeight: '70vh',
                overflow: 'scroll',
                padding: 20,
              }}
            >
              {theory[0].image && (
                <img
                  src={decrypt(theory[0].image)}
                  style={{ height: 100, width: 'auto' }}
                  alt=''
                />
              )}
              <h3> {decrypt(theory[0].title)}</h3>
              <MDEditor.Markdown
                source={decrypt(theory[0].theory)}
                style={{ textAlign: 'left' }}
              />
            </div>
          </Modal>
        )}

        <div className='wrong_answer_content'>
          <p>{wrong.question}</p>
          <div>
            <p>
              <strong>Risposta corretta:</strong>
            </p>
            <p className='right'>{wrong.response ? 'VERO' : 'FALSO'}</p>
            <p>
              <strong>La tua risposta:</strong>
            </p>
            <p className='wrong'>
              {(() => {
                if (!isAllQuestions) {
                  if (wrong.userResponse === true) {
                    return 'VERO';
                  } else if (wrong.userResponse === false) {
                    return 'FALSO';
                  } else {
                    return 'NON DATA';
                  }
                } else {
                  if (answers[index] === true) {
                    return 'VERO';
                  } else if (answers[index] === false) {
                    return 'FALSO';
                  } else {
                    return 'NON DATA';
                  }
                }
              })()}
            </p>
          </div>
        </div>

        <div className='wrong_bottom'>
          {isAllQuestions && <p> {index + 1} / 40</p>}
          {!isAllQuestions && <p> {wrong.num + 1} / 40</p>}

          <div>
            <Button
              className='quiz_problem active'
              onClick={() => setOpenModal(true)}
              disabled={!canReport}
              variant='contained'
              style={{
                background: 'red',
                color: 'white',
              }}
            >
              <WarningIcon />
            </Button>
            <img
              src='/book.svg'
              alt=''
              className='open_theory'
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WrongAnswer;
