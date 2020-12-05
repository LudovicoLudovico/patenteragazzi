import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Timer from 'react-compound-timer';
import { getQuestionsClient } from '../fetchData/getQuestionsClient';
import { useUser } from '../context/userContext';
import Link from 'next/link';
import Head from 'next/head';
import Modal from '@material-ui/core/Modal';
import Image from 'next/image';

//Components
import WrongAnswer from '../components/WrongAnswer';
import QuizBottom from '../components/QuizBottom';

const quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [answers, setAnswers] = useState(new Array(40));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [open, setOpen] = useState(false);
  const [canCorrect, setCanCorrect] = useState(false);
  const { user, login } = useUser();

  useEffect(() => {
    if (user) {
      async function fetchData() {
        const newQuestion = await getQuestionsClient();
        setQuizQuestions(newQuestion);
      }
      fetchData();
    }
  }, [user]);

  //Set answers when the true or false button is pressed
  const getAnswer = (index, answer) => {
    if (questionCounter + 1 !== quizQuestions.length) {
      setQuestionCounter((prevState) => prevState + 1);
      let answersCopy = [...answers];
      answersCopy[index] = answer;

      setAnswers(answersCopy);
    } else {
      setQuestionCounter(index);
      let answersCopy = [...answers];
      answersCopy[index] = answer;

      setAnswers(answersCopy);
    }
  };

  //Correct the quiz comparing answers
  const correct = () => {
    let quizQuestionsCopy = [...quizQuestions];

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

  if (user && quizQuestions.length > 5) {
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
                      disabled={quizQuestions.length !== 40}
                    >
                      Correggi
                    </Button>

                    <Link href='/'>
                      <a>
                        <button className='close_quiz'>x</button>
                      </a>
                    </Link>
                  </div>
                </div>

                {quizQuestions.length !== 0 && (
                  <div className='quiz_content'>
                    {quizQuestions[questionCounter] && (
                      <div className='quiz_image'>
                        {quizQuestions[questionCounter].image ? (
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
                                src={quizQuestions[questionCounter].image}
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
                              src={quizQuestions[questionCounter].image}
                              alt=''
                            />
                          </>
                        ) : (
                          <div className='modal_img'></div>
                        )}
                      </div>
                    )}

                    <div className='quiz_right'>
                      {/* Question */}
                      <div className='quiz_question'>
                        <p>{quizQuestions[questionCounter].question}</p>
                      </div>

                      {/* Buttons for answering */}
                      <div className='quiz_answer'>
                        <Button
                          variant='contained'
                          className='quiz_answer_btn'
                          onClick={() => {
                            getAnswer(questionCounter, true);
                          }}
                        >
                          Vero
                        </Button>
                        <Button
                          variant='contained'
                          className='quiz_answer_btn'
                          onClick={() => {
                            getAnswer(questionCounter, false);
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
                  quizQuestions={quizQuestions}
                  setQuestionCounter={(index) => setQuestionCounter(index)}
                />
              </div>
            )}

            {showScore && (
              <div className='score'>
                <h1>Risultato {score}/40</h1>
                <Link href='/' passHref className='close_quiz'>
                  <a>
                    <button>x</button>
                  </a>
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
  } else if (!user) {
    return (
      <div>
        <h2>Per fare i quiz devi essere autenticato</h2>
        <button onClick={() => login()}>Accedi</button>
      </div>
    );
  } else {
    return (
      <div className='loading'>
        <Image
          src='/car.svg'
          alt='Caricamento'
          layout={'intrinsic'}
          width={150}
          height={150}
        />
        <p>Caricamento...</p>
      </div>
    );
  }
};

export default quiz;
