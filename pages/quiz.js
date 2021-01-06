//Next/React imports
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import firebase from 'firebase/app';

//Material UI
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { decrypt } from '../lib/enc';
//Context/Fetch
import { getQuestions } from '../fetchData/getQuestions';
import { getTheory } from '../fetchData/getTheory';
import WarningIcon from '@material-ui/icons/Warning';

//Components
import Timer from 'react-compound-timer';
import Score from '../components/quiz/Score';
import QuizBottom from '../components/quiz/QuizBottom';
import QuizComp from '../components/quiz/QuizComp';

const newQuiz = ({ questions, theory }) => {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [answers, setAnswers] = useState(new Array(40));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [open, setOpen] = useState(false);
  const [correctPopup, setCorrectPopup] = useState(false);
  const [ungivenState, setUngivenState] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [canReport, setCanReport] = useState([]);

  useEffect(() => {
    let extracted = [];

    for (let i = 0; i < 40; i++) {
      const rand = Math.floor(Math.random() * questions.length);
      if (!extracted.includes(rand)) {
        extracted.push(rand);
        setQuizQuestions((quizQuestions) => [
          ...quizQuestions,
          {
            questionId: questions[rand].id,
            question: decrypt(questions[rand].question),
            image: decrypt(questions[rand].image),
            response: questions[rand].response,
            answer: questions[rand].answer,
            category: questions[rand].category,
          },
        ]);
      } else {
        i--;
      }
    }
  }, []);

  const setProblem = () => {
    if (!canReport.includes(questionCounter)) {
      const question = quizQuestions[questionCounter];
      console.log(question);
      firebase
        .firestore()
        .collection('problems')
        .add({
          type: 'question',
          questionId: question.questionId,
          question: question.question,
          category: question.category,
          image: question.image,
          answer: question.answer,
          response: question.response,
        })
        .then(() => {
          setCanReport((canReport) => [...canReport, questionCounter]);
        });
    }
  };

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
                    <Button
                      className='quiz_problem active'
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
                {quizQuestions.map((question, index) => {
                  return (
                    <QuizComp
                      questionCounter={questionCounter}
                      index={index}
                      question={question}
                      getTrueAnswer={() => {
                        getAnswer(index, true);
                      }}
                      getFalseAnswer={() => {
                        getAnswer(index, false);
                      }}
                    />
                  );
                })}
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
                      <p className='correct_back'>Torna al quiz</p>
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
                      <p className='correct_back'>Torna al quiz</p>
                    </>
                  )}
                </div>
              </Modal>
            )}

            {showScore && (
              <Score
                score={score}
                wrongAnswers={wrongAnswers}
                theory={theory}
              />
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
  const theoryRaw = await getTheory();

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questionsRaw)),
      theory: JSON.parse(JSON.stringify(theoryRaw)),
    },
  };
}
export default newQuiz;
