import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { getQuestions } from '../fetchData/getQuestions';
import { getTheory } from '../fetchData/getTheory';
import { decrypt } from '../lib/enc';
import Timer from 'react-compound-timer';
import uuid from 'react-uuid';
import { Button, Modal } from '@material-ui/core';
import Link from 'next/link';
import QuizSimComp from '../components/quizSim/QuizSimComp';

import dynamic from 'next/dynamic';
import Seo from '../components/Seo';
const UngivenModal = dynamic(() => import('../components/quiz/UngivenModal'), {
  loading: () => <p>Caricamento...</p>,
});

const Score = dynamic(() => import('../components/quiz/Score'), {
  loading: () => <p>Caricamento...</p>,
});

import '../quizSim.min.css';

const simulazioneQuiz = ({ questions, theory }) => {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [answers, setAnswers] = useState(new Array(40));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [open, setOpen] = useState(false);
  const [correctPopup, setCorrectPopup] = useState(false);
  const [ungivenState, setUngivenState] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [extracted, setExtracted] = useState([]);

  const filterAndSet = (category, num) => {
    const sdp = questions.filter((val) => val.category == category);

    for (let i = 0; i < num; i++) {
      const rand = Math.floor(Math.random() * sdp.length);

      const question = decrypt(sdp[rand].question);

      if (!extracted.includes(question)) {
        setExtracted((extracted) => [...extracted, question]);

        setQuizQuestions((quizQuestions) => [
          ...quizQuestions,
          {
            question: question,
            image: decrypt(sdp[rand].image),
            response: sdp[rand].response,
            answer: sdp[rand].answer,
            category: sdp[rand].category,
          },
        ]);
      } else {
        i--;
      }
    }
  };

  const filterAndSetSecondary = () => {
    const sdp = questions.filter((val) => {
      return (
        val.category !== 'Segnali di pericolo' &&
        val.category !== 'Segnali di divieto' &&
        val.category !== 'Segnali di obbligo' &&
        val.category !== 'Segnali di precedenza' &&
        val.category !== 'Segnaletica orizzontale e segni sugli ostacoli' &&
        val.category !==
          'Segnalazioni semaforiche e degli agenti del traffico' &&
        val.category !==
          'Limiti di velocità, pericolo e intralcio alla circolazione' &&
        val.category !== 'Distanza di sicurezza' &&
        val.category !== 'Norme sulla circolazione dei veicoli' &&
        val.category !== 'Ordine di precedenza agli incroci' &&
        val.category !== 'Norme sul sorpasso' &&
        val.category !== 'Norme varie' &&
        val.category !==
          'Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza' &&
        val.category !==
          'Incidenti stradali e comportamenti in caso di incidente' &&
        val.category !==
          'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'
      );
    });

    for (let i = 0; i < 10; i++) {
      const rand = Math.floor(Math.random() * sdp.length);

      const question = decrypt(sdp[rand].question);

      if (!extracted.includes(question)) {
        setExtracted((extracted) => [...extracted, question]);

        setQuizQuestions((quizQuestions) => [
          ...quizQuestions,
          {
            question: question,
            image: decrypt(sdp[rand].image),
            response: sdp[rand].response,
            answer: sdp[rand].answer,
            category: sdp[rand].category,
          },
        ]);
      } else {
        i--;
      }
    }
  };

  useEffect(() => {
    filterAndSet('Segnali di pericolo', 2);
    filterAndSet('Segnali di divieto', 2);
    filterAndSet('Segnali di obbligo', 2);
    filterAndSet('Segnali di precedenza', 2);
    filterAndSet('Segnaletica orizzontale e segni sugli ostacoli', 2);
    filterAndSet('Segnalazioni semaforiche e degli agenti del traffico', 2);
    filterAndSet(
      'Limiti di velocità, pericolo e intralcio alla circolazione',
      2
    );
    filterAndSet('Distanza di sicurezza', 2);
    filterAndSet('Norme sulla circolazione dei veicoli', 2);
    filterAndSet('Ordine di precedenza agli incroci', 2);
    filterAndSet('Norme sul sorpasso', 2);
    filterAndSet('Norme varie', 2);
    filterAndSet(
      'Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza',
      2
    );
    filterAndSet('Incidenti stradali e comportamenti in caso di incidente', 2);
    filterAndSet(
      'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso',
      2
    );
    filterAndSetSecondary();

    // shuffleArray();
  }, []);

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
                category: quizQuestionsCopy[i].category,
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
                category: quizQuestionsCopy[i].category,
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
              category: quizQuestionsCopy[i].category,
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
              category: quizQuestionsCopy[i].category,
              num: i,
            },
          ]);
        }
      }
    }

    setShowScore(true);
    setCorrectPopup(false);
  };

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

  const getAnswer = (index, answer) => {
    if (questionCounter + 1 !== quizQuestions.length) {
      let answersCopy = [...answers];
      answersCopy[index] = answer;

      setAnswers(answersCopy);
    } else {
      let answersCopy = [...answers];
      answersCopy[index] = answer;

      setAnswers(answersCopy);

      setCorrectPopup(true);
    }
  };
  return (
    <>
      <Seo
        title='Simulazione Esame AM/B'
        description="Simulazione d'esame con il layout della scheda che ti sarà presentata all'esame"
        canonical='https://patenteragazzi.it/simulazione-quiz'
      />

      <div className='quiz-sim'>
        {!showScore && (
          <div className='quiz-sim_container'>
            <div className='quiz-sim_nav'>
              <div
                className='quiz-sim_bigger'
                onClick={(e) => {
                  if (e.target.id) {
                    setQuestionCounter(parseInt(e.target.id));
                  }
                }}
              >
                <div
                  id={0}
                  className={` ${
                    questionCounter >= 0 && questionCounter < 10 ? 'active' : ''
                  }`}
                >
                  Domande da 1 a 10
                </div>
                <div
                  id={10}
                  className={`${
                    questionCounter >= 10 && questionCounter < 20
                      ? 'active'
                      : ''
                  }`}
                >
                  Domande da 11 a 20
                </div>
                <div
                  id={20}
                  className={`${
                    questionCounter >= 20 && questionCounter < 30
                      ? 'active'
                      : ''
                  }`}
                >
                  Domande da 21 a 30
                </div>
                <div
                  id={30}
                  className={`${
                    questionCounter >= 30 && questionCounter < 40
                      ? 'active'
                      : ''
                  }`}
                >
                  Domande da 31 a 40
                </div>
              </div>

              <div
                className='quiz-sim_small'
                onClick={(e) => {
                  if (e.target.id) {
                    setQuestionCounter(parseInt(e.target.id));
                  }
                }}
              >
                {quizQuestions.map((question, index) => {
                  return (
                    <div
                      key={uuid()}
                      id={index}
                      className={`${questionCounter == index ? 'active' : ''}
                    ${questionCounter < 10 && index < 10 ? 'display' : ''}
                    ${
                      questionCounter >= 10 &&
                      index >= 10 &&
                      questionCounter < 20 &&
                      index < 20
                        ? 'display'
                        : ''
                    }
                    ${
                      questionCounter >= 20 &&
                      index >= 20 &&
                      questionCounter < 30 &&
                      index < 30
                        ? 'display'
                        : ''
                    }
                    ${
                      questionCounter >= 30 &&
                      index >= 30 &&
                      questionCounter < 40 &&
                      index < 40
                        ? 'display'
                        : ''
                    }
                    
                    `}
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>
              <div
                className='quiz-sim_smaller'
                onClick={(e) => {
                  if (e.target.id) {
                    setQuestionCounter(parseInt(e.target.id));
                  }
                }}
              >
                {quizQuestions.map((question, index) => {
                  return (
                    <div
                      key={uuid()}
                      id={index}
                      className={`${questionCounter == index ? 'active' : ''}`}
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>
            </div>
            {quizQuestions.map((question, index) => {
              return (
                <QuizSimComp
                  key={index}
                  index={index}
                  questionCounter={questionCounter}
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
            <div className='quiz-sim_bottom'>
              <div className='quiz-sim_timer'>
                <p>Tempo a disposizione</p>
                {/* Timer */}
                {/* Timer value should be  1800000 (30:00) */}
                <Timer
                  initialTime={1800000}
                  startImmediately={true}
                  direction='backward'
                  checkpoints={[
                    {
                      time: 0,
                      callback: () => forceCorrect(),
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

              <div className='quiz-sim_bottom_right'>
                <div className='quiz-sim_summary'></div>
                <div className='quiz-sim_prev'>
                  <img
                    src='/sim-arrow.svg'
                    alt=''
                    onClick={() => {
                      if (questionCounter !== 0) {
                        setQuestionCounter((prevState) => prevState - 1);
                      }
                    }}
                  />
                  <img
                    src='/sim-arrow.svg'
                    alt=''
                    onClick={() => {
                      if (questionCounter !== 39) {
                        setQuestionCounter((prevState) => prevState + 1);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <br />
            <Link href='/'>
              <a>Torna alla home</a>
            </Link>

            <div className='quiz-sim_correct' onClick={correct}>
              Correggi
            </div>
          </div>
        )}
        <UngivenModal
          ungivenState={ungivenState}
          correct={correct}
          forceCorrect={forceCorrect}
          setCorrectPopup={(e) => setCorrectPopup(e)}
        />

        <Score
          showScore={showScore}
          score={score}
          wrongAnswers={wrongAnswers}
          theory={theory}
          quizQuestions={quizQuestions}
          answers={answers}
        />
      </div>
    </>
  );
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
export default simulazioneQuiz;
