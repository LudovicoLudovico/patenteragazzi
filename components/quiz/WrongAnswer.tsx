// General imports
import { useState } from 'react';
import { decrypt } from '../../lib/enc';
import firebase from 'firebase/app';

// Layout imports
import MDEditor from '@uiw/react-md-editor';
import { Modal, Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
// const ReportPopup = dynamic(() => import('./ReportPopup'));
import ReportPopup from './ReportPopup';

// Types
import { Wrong, Theory } from '../../interfaces';

interface WrongAnswerProps {
  theory: Theory[];
  answers: boolean[];
  isAllQuestions?: boolean;
  index: number;
  wrong: Wrong;
}

// Functional Component
const WrongAnswer = ({
  wrong,
  theory,
  answers,
  isAllQuestions,
  index,
}: WrongAnswerProps) => {
  const [open, setOpen] = useState(false);
  const [canReport, setCanReport] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [hasProblemImage, setHasProblemImage] = useState(false);
  const [hasProblemQuestion, setHasProblemQuestion] = useState(false);
  const [hasProblemAnswer, setHasProblemAnswer] = useState(false);

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
        <ReportPopup
          canReport={canReport}
          hasProblemImage={hasProblemImage}
          hasProblemQuestion={hasProblemQuestion}
          hasProblemAnswer={hasProblemAnswer}
          setProblem={setProblem}
          setHasProblemImage={setHasProblemImage}
          setHasProblemAnswer={setHasProblemAnswer}
          setHasProblemQuestion={setHasProblemQuestion}
        />
      </Modal>
      <div
        className={`wrong_answer ${wrong.image ? 'image' : 'no-image'}`}
        style={{ position: 'relative' }}
      >
        <div className='wrong_answer_image'>
          {wrong.image ? (
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
                  src={wrong.image}
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
                src={wrong.image}
                alt='Caricamento...'
              />
            </>
          ) : (
            <div className='modal_img'></div>
          )}
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
            {!wrong.isChecked && (
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
            )}

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
