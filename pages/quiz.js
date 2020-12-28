//Next/React imports
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

//Material UI
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { decrypt } from '../lib/enc';
//Context/Fetch
import { getQuestions } from '../fetchData/getQuestions';

//Components
import Timer from 'react-compound-timer';
import WrongAnswer from '../components/quiz/WrongAnswer';
import QuizBottom from '../components/quiz/QuizBottom';

const newQuiz = ({ questions }) => {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [answers, setAnswers] = useState(new Array(40));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [open, setOpen] = useState(false);
  const [correctPopup, setCorrectPopup] = useState(false);
  const [ungivenState, setUngivenState] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    let extracted = [];
    let allQuestionsCopy = decrypt(questions);
    let allQuestions = JSON.parse(allQuestionsCopy);

    for (let i = 0; i < 40; i++) {
      const rand = Math.floor(Math.random() * allQuestions.length);
      if (!extracted.includes(rand)) {
        extracted.push(rand);
        setQuizQuestions((quizQuestions) => [
          ...quizQuestions,
          allQuestions[rand],
        ]);
      } else {
        i--;
      }
    }
  }, []);

  //This func loops through the answers and check if there are
  //any undefined or null valuse. Then is stores their index in an array
  const checkUngiven = () => {
    let i = 0;
    let ungiven = [];
    const answersCopy = [...answers];
    answersCopy.forEach((answer) => {
      if (answer == undefined || answer == null) {
        ungiven.push(i);
      }
      i++;
    });

    setUngivenState({
      number: ungiven.length,
      position: ungiven,
    });
  };

  useEffect(() => {
    checkUngiven();
  }, [answers]);

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

      setCorrectPopup(true);
    }
  };

  //Correct the quiz comparing answers
  const correct = () => {
    checkUngiven();

    if (ungivenState.position.length === 0) {
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
    } else {
      setCorrectPopup(true);
    }
  };

  //This func is used to force the correction of the quiz
  // It doesn't perform ungivenCheck
  const forceCorrect = () => {
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
    setCorrectPopup(false);
  };

  //If 5 questions are loaded then display UI, in the meantime display
  //a loading screen with rotating icon
  if (quizQuestions.length !== 0) {
    return (
      <>
        <NextSeo
          title='Patenteragazzi - Quiz Patente Online AM/B'
          description='Più di 7000 domande della patente AM/B'
          canonical='https://patenteragazzi.it/quiz'
          openGraph={{
            url: 'https://patenteragazzi.it/quiz',
            title: 'Patenteragazzi',
            description: 'Più di 7000 domande della patente AM/B',
            images: [
              {
                url: 'https://patenteragazzi.it/patenteragazzi-square.png',
                width: 600,
                height: 600,
                alt: 'Patenteragazzi Logo',
              },
            ],
            site_name: 'Patenteragazzi',
          }}
        />
        <Head>
          <link rel='shortcut icon' href='/patenteragazzi.ico' />
        </Head>
        <div className='quiz' id='quiz'>
          <div className='container'>
            {!showScore && (
              <div className='standard_quiz'>
                <div className='quiz_top'>
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
                  </div>

                  {/* Top right section of the quiz, contains correct btn and close btn */}
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

                {/* If there are quizQuestions in the state then display question, image and modal */}
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
                {/* Bottom Navigation */}
                <QuizBottom
                  questionCounter={questionCounter}
                  quizQuestions={quizQuestions}
                  setQuestionCounter={(index) => setQuestionCounter(index)}
                />
              </div>
            )}

            {ungivenState && (
              <Modal
                open={correctPopup}
                onClick={() => setCorrectPopup(false)}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  outline: 'none',
                }}
              >
                <div className='correct_popup'>
                  {ungivenState.number !== 0 && (
                    <>
                      <h3>Non hai risposto a {ungivenState.number} domande</h3>
                      <p>Vuoi consegnarlo comunque?</p>
                      <Button
                        variant='contained'
                        className='correct_btn'
                        onClick={forceCorrect}
                      >
                        Correggi
                      </Button>
                    </>
                  )}

                  {ungivenState.number === 0 && (
                    <>
                      <h3>Hai completato il quiz!</h3>
                      <p>Vuoi correggerlo?</p>
                      <Button
                        variant='contained'
                        className='correct_btn'
                        onClick={forceCorrect}
                      >
                        Correggi
                      </Button>
                    </>
                  )}
                </div>
              </Modal>
            )}

            {showScore && (
              <div className='score'>
                <div className='score_top'>
                  <div>
                    <h1>
                      Risultato {score}/40 -
                      {score >= 36 ? '    Promosso' : '    Bocciato'}
                    </h1>
                  </div>

                  <Link href='/' passHref>
                    <a className='close_quiz'>
                      <button>X</button>
                    </a>
                  </Link>
                </div>

                <div className='wrong_answer_container'>
                  {wrongAnswers.map((wrong, id) => {
                    return <WrongAnswer wrong={wrong} key={id} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
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

export async function getStaticProps(context) {
  const questionsRaw = await getQuestions();

  return {
    props: {
      questions: questionsRaw,
    },
  };
}
export default newQuiz;
