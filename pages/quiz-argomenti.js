//Next/React imports
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { getQuestions } from '../fetchData/getQuestions';
import { getTheory } from '../fetchData/getTheory';

//Material UI
import { Modal, Button } from '@material-ui/core';

//Context/Fetch
import TopicQuizSelec from '../components/TopicQuizSelec';

//Components
import Timer from 'react-compound-timer';
import WrongAnswer from '../components/quiz/WrongAnswer';
import QuizBottom from '../components/quiz/QuizBottom';
import Score from '../components/quiz/Score';
import { decrypt } from '../lib/enc';

const quizArgomenti = ({ questions, theory }) => {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [answers, setAnswers] = useState(new Array(40));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [open, setOpen] = useState(false);
  const [correctPopup, setCorrectPopup] = useState(false);
  const [ungivenState, setUngivenState] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [filters, setFilters] = useState([]);

  const startQuiz = async () => {
    const questsFiltered = questions.filter((item) => {
      return filters.includes(item.category);
    });

    if (questsFiltered.length >= 40) {
      let extracted = [];
      for (let i = 0; i < 40; i++) {
        const rand = Math.floor(Math.random() * questsFiltered.length);
        if (!extracted.includes(rand)) {
          extracted.push(rand);
          setQuizQuestions((quizQuestions) => [
            ...quizQuestions,
            {
              question: decrypt(questsFiltered[rand].question),
              image: decrypt(questsFiltered[rand].image),
              response: questsFiltered[rand].response,
              answer: questsFiltered[rand].answer,
              category: questsFiltered[rand].category,
            },
          ]);
        } else {
          i--;
        }
      }
      setShowQuiz(true);
    } else {
      alert('Domande insufficienti selezionare altre categorie');
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
  if (showQuiz) {
    return (
      <>
        <NextSeo
          title='Patenteragazzi - Quiz Patente Online AM/B'
          description='Più di 7000 domande della patente AM/B'
          canonical='https://patenteragazzi.it/quiz-argomenti'
          openGraph={{
            url: 'https://patenteragazzi.it/quiz-argomenti',
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
        <div className='quiz quiz-argomenti' id='quiz'>
          <div className='container'>
            {!showScore && showQuiz && (
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

                {quizQuestions.map((question, index) => {
                  return (
                    <div
                      key={index}
                      className={`quiz_content ${
                        index == questionCounter ? 'active' : ''
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
                              alt=''
                            />
                          </>
                        ) : (
                          <div className='modal_img'></div>
                        )}
                      </div>

                      <div className='quiz_right'>
                        {/* Question */}
                        <div className='quiz_question'>
                          <p>{question.question}</p>
                        </div>

                        {/* Buttons for answering */}
                        <div className='quiz_answer'>
                          <Button
                            variant='contained'
                            className='quiz_answer_btn'
                            onClick={() => {
                              getAnswer(index, true);
                            }}
                          >
                            Vero
                          </Button>
                          <Button
                            variant='contained'
                            className='quiz_answer_btn'
                            onClick={() => {
                              getAnswer(index, false);
                            }}
                          >
                            Falso
                          </Button>
                        </div>
                      </div>
                    </div>
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

            {showScore && showQuiz && (
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
      <>
        <NextSeo
          title='Quiz Patente Argomenti - Patenteragazzi'
          description='Più di 7000 domande della patente AM/B'
          canonical='https://patenteragazzi.it/quiz-argomenti'
          openGraph={{
            url: 'https://patenteragazzi.it/quiz-argomenti',
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
        <div className='topic-choice '>
          <div className='container-full'>
            <div className='topic-choice-top'>
              <h2>Scegli argomenti per il quiz</h2>
              <div>
                <Button
                  variant='contained'
                  className='start'
                  onClick={startQuiz}
                >
                  Inizia quiz
                </Button>
                <Link href='/'>
                  <a>
                    <button className='close_quiz'>X</button>
                  </a>
                </Link>
              </div>
            </div>

            <div className='topics-list'>
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={"Definizioni generali e doveri nell'uso della strada"}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Segnali di pericolo'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Segnali di divieto'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Segnali di obbligo'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Segnali di precedenza'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Segnaletica orizzontale e segni sugli ostacoli'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Segnalazioni semaforiche e degli agenti del traffico'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Segnali di indicazione'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Segnali complementari, segnali temporanei e di cantiere'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Pannelli integrativi dei segnali'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={
                  'Limiti di velocità, pericolo e intralcio alla circolazione'
                }
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Distanza di sicurezza'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Norme sulla circolazione dei veicolio'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={
                  'Esempi di precedenza (ordine di precedenza agli incroci)'
                }
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Fermata, sosta, arresto e partenza'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={
                  'Norme varie (ingombro della carreggiata, circolazione su autostrade e strade extraurbane principali, trasporto di persone, pannelli sui veicoli, etc.)'
                }
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={
                  'Uso delle luci e dei dispositivi acustici, spie e simboli'
                }
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={
                  'Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza'
                }
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={
                  'Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti, uso di lenti e altri apparecchi'
                }
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={'Incidenti stradali e comportamenti in caso di incidente'}
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={
                  'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'
                }
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={
                  'Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'
                }
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={
                  "Limitazione dei consumi, rispetto dell'ambiente e inquinamento"
                }
              />
              <TopicQuizSelec
                filters={filters}
                setFilters={setFilters}
                text={
                  'Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e tenuta di strada, comportamenti e cautele di guida'
                }
              />
            </div>
          </div>
        </div>
      </>
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

export default quizArgomenti;
