import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Timer from 'react-compound-timer';
import { getQuestionsServer } from '../fetchData/getQuestionsServer';
import { getQuestionsClient } from '../fetchData/getQuestionsClient';
import { useUser } from '../context/userContext';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Modal from '@material-ui/core/Modal';

//Components
import WrongAnswer from '../components/WrongAnswer';
import QuizBottom from '../components/QuizBottom';

const quiz = (props) => {
  const [questions, setQuestions] = useState(props.questions);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [answers, setAnswers] = useState(new Array(40));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [open, setOpen] = useState(false);

  const { user, login } = useUser();

  useEffect(async () => {
    for (let i = 0; i < 35; i++) {
      const newQuestion = await getQuestionsClient(1);
      setQuestions((questions) => [...questions, newQuestion[0]]);
    }

    return;
  }, []);
  //Set answers when the true or false button is pressed
  const getAnswer = (index, answer) => {
    if (questionCounter + 1 !== questions.length) {
      setQuestionCounter((prevState) => prevState + 1);
    } else {
      setQuestionCounter(index);
    }

    let answersCopy = [...answers];
    answersCopy[index] = answer;

    setAnswers(answersCopy);
  };

  //Correct the quiz comparing answers
  const correct = () => {
    let quizQuestionsCopy = [...questions];

    for (let i = 0; i < 40; i++) {
      if (answers[i] === quizQuestionsCopy[i].response) {
        setScore((prevState) => prevState + 1);
      } else {
        if (answers[i] === undefined || answers[i] === null) {
          setWrongAnswers((wrongAnswers) => [
            ...wrongAnswers,
            {
              userResponse: null,
              question: quizQuestionsCopy[i].question,
              response: quizQuestionsCopy[i].response,
              image: quizQuestionsCopy[i].image,
              answer: quizQuestionsCopy[i].answer,
              num: i,
            },
          ]);
        } else {
          setWrongAnswers((wrongAnswers) => [
            ...wrongAnswers,
            {
              userResponse: !quizQuestionsCopy[i].response,
              question: quizQuestionsCopy[i].question,
              response: quizQuestionsCopy[i].response,
              image: quizQuestionsCopy[i].image,
              answer: quizQuestionsCopy[i].answer,
              num: i,
            },
          ]);
        }
      }
    }

    setShowScore(true);
  };

  return (
    <>
      <Head>
        <title>Patenteragazzi - Quiz Online Patente AM/B</title>
        <link rel='icon' href='/patenteragazzi.ico' />
      </Head>
      <div className='quiz' id='quiz'>
        <div className='container'>
          {!showScore && (
            <div className='standard_quiz'>
              <div className='quiz_top'>
                <div className='quiz_timer'>
                  {/* 1800000 */}
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
                      formatValue={(value) =>
                        `${value < 10 ? `0${value}` : value}`
                      }
                    />
                    :
                    <Timer.Seconds
                      formatValue={(value) =>
                        `${value < 10 ? `0${value}` : value}`
                      }
                    />
                  </Timer>
                </div>{' '}
                <div className='quiz_top_right'>
                  <Button
                    variant='contained'
                    className='correct_btn'
                    onClick={correct}
                  >
                    Correggi
                  </Button>

                  <a href='/'>
                    <button className='close_quiz'>x</button>
                  </a>
                </div>
              </div>

              {questions.length !== 0 && (
                <div className='quiz_content'>
                  <div className='quiz_image'>
                    {questions[questionCounter].image ? (
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
                            src={questions[questionCounter].image}
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
                          src={questions[questionCounter].image}
                          alt=''
                        />
                      </>
                    ) : (
                      <img src='/transparent.png' alt='No image' />
                    )}
                  </div>

                  <div className='quiz_right'>
                    {/* Question */}
                    <div className='quiz_question'>
                      <p>{questions[questionCounter].question}</p>
                    </div>

                    {/* Buttons for answering */}
                    <div className='quiz_answer'>
                      <Button
                        variant='contained'
                        className='quiz_answer_btn'
                        onClick={() => {
                          if (questionCounter + 1 < questions.length) {
                            getAnswer(questionCounter, true);
                          } else {
                            correct();
                          }
                        }}
                      >
                        Vero
                      </Button>
                      <Button
                        variant='contained'
                        className='quiz_answer_btn'
                        onClick={() => {
                          if (questionCounter + 1 < questions.length) {
                            getAnswer(questionCounter, false);
                          } else {
                            correct();
                          }
                        }}
                      >
                        Falso
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <QuizBottom
                questionCounter={questionCounter}
                quizQuestions={questions}
                setQuestionCounter={(index) => setQuestionCounter(index)}
              />
            </div>
          )}

          {showScore && (
            <div className='score'>
              <h1>Risultato {score}/40</h1>
              <Link href='/'>
                <button className='close_quiz'>x</button>
              </Link>

              <div className='wrong_answer_container'>
                {wrongAnswers.map((wrong, id) => {
                  return (
                    <WrongAnswer
                      wrong={wrong}
                      key={id}
                      // theory={getTheory(wrong.answer)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default quiz;

export async function getServerSideProps() {
  const questionsRaw = await getQuestionsServer(5);
  const questionStr = JSON.stringify(questionsRaw);
  const questions = JSON.parse(questionStr);

  return {
    props: {
      questions,
    }, // will be passed to the page component as props
  };
}
