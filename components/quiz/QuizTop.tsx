import { useState } from 'react';
import Timer from 'react-compound-timer';
import { Modal, Button } from '@material-ui/core';
import firebase from 'firebase/app';
import Link from 'next/link';
import Image from 'next/image';
import ReportPopup from './ReportPopup';

interface QuizTopProps {
  questionCounter: number;
  quizQuestions: Question[];
  correct: () => void;
}

interface Question {
  question: string;
  questionId: string;
  category: string;
  image?: string;
  answer: string;
  response: boolean;
  isChecked?: boolean;
}
const QuizTop = ({ correct, questionCounter, quizQuestions }: QuizTopProps) => {
  const [canReport, setCanReport] = useState([]);
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
        question: quizQuestions[questionCounter].question,
        questionId: quizQuestions[questionCounter].questionId,
        category: quizQuestions[questionCounter].category,
        image: quizQuestions[questionCounter].image,
        answer: quizQuestions[questionCounter].answer,
        response: quizQuestions[questionCounter].response,
        hasProblemImage,
        hasProblemQuestion,
        hasProblemAnswer,
      })
      .then(() => {
        setOpenModal(false);
        setCanReport((canReport) => {
          return [...canReport, questionCounter];
        });
      });
  };

  return (
    <>
      {!quizQuestions[questionCounter].isChecked && (
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
      )}

      <div className='quiz_top'>
        <div className='quiz_top_left'>
          <div className='quiz_timer'>
            {/* Timer */}
            {/* Timer value should be  1800000 (30:00) */}
            <Timer
              initialTime={1800000}
              startImmediately={true}
              direction='backward'
              checkpoints={[
                {
                  time: 0,
                  callback: () => correct(),
                },
              ]}
            >
              <Timer.Minutes
                formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
              />
              :
              <Timer.Seconds
                formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
              />
            </Timer>
          </div>
          {!quizQuestions[questionCounter].isChecked && (
            <Button
              className='quiz_problem'
              onClick={() => setOpenModal(true)}
              disabled={canReport.includes(questionCounter)}
              variant='contained'
              aria-label={`Segnala Domanda Numero ${questionCounter + 1}`}
            >
              <p>Segnala domanda</p>
              <Image src={'/danger.svg'} width={20} height={20} />
            </Button>
          )}
        </div>

        {/* Top right section of the quiz, contains correct btn and close btn */}
        <div className='quiz_top_right'>
          <Button
            variant='contained'
            className='correct_btn'
            onClick={correct}
            name='Correggi'
          >
            <Image src={'/flag.svg'} width={24} height={24} />
          </Button>
          <Link href='/'>
            <a title='Esci'>
              <Button variant='contained' className='close_btn'>
                Esci
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuizTop;
