import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

//Get Datqa
import { getQuestions } from '../fetchData/getQuestions';
import { getTheory } from '../fetchData/getTheory';

//Decryption
import { decrypt } from '../lib/enc';

//Components
import Seo from '../components/Seo';
import QuizSimComp from '../components/quizSim/QuizSimComp';
const QuizSimNav = dynamic(() => import('../components/quizSim/QuizSimNav'));
const QuizSimBottom = dynamic(
  () => import('../components/quizSim/QuizSimBottom')
);
const UngivenModal = dynamic(() => import('../components/quiz/UngivenModal'));
const Score = dynamic(() => import('../components/quiz/Score'));

import '../style/quizSim.min.css';

interface simulazioneQuizProps {
  questions: Questions[];
  theory: Theory[];
}

interface Questions {
  id: string;
  question: string;
  answer: string;
  response: boolean;
  image: string | null;
  category: string;
}

interface Theory {
  id: string;
  category: string;
  image: string | null;
  slug: string | null;
  theory: string;
  title: string;
}
const simulazioneQuiz = ({ questions, theory }: simulazioneQuizProps) => {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [answers, setAnswers] = useState(new Array(40));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctPopup, setCorrectPopup] = useState(false);
  const [ungivenState, setUngivenState] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [extracted, setExtracted] = useState([]);

  const filterAndSet = (category: string, num: number) => {
    const sdp = questions.filter((val: any) => val.category == category);

    for (let i = 0; i < num; i++) {
      const rand = Math.floor(Math.random() * sdp.length);
      console.log(rand);
      console.log(extracted.indexOf(rand));

      const question = decrypt(sdp[rand].question);

      if (extracted.indexOf(rand) !== -1) {
        setExtracted((prevState) => [...prevState, rand]);

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
    const sdp = questions.filter((val: any) => {
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

      if (extracted.indexOf(rand) !== -1) {
        setExtracted((prevState) => [...prevState, rand]);

        setQuizQuestions((quizQuestions) => [
          ...quizQuestions,
          {
            question: question,
            image: decrypt(sdp[rand].image),
            response: sdp[rand].response,
            answer: sdp[rand].answer,
            category: sdp[rand].category,
            questionId: sdp[rand].id,
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
                questionId: quizQuestionsCopy[i].questionId,
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
                questionId: quizQuestionsCopy[i].questionId,
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
              questionId: quizQuestionsCopy[i].questionId,
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
              questionId: quizQuestionsCopy[i].questionId,
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

  useEffect(() => {
    if (window.innerWidth < 800) {
      alert(
        "Sembra tu sia su un dispositivo mobile. Per un'esperienza ottimale ti consigliamo di effettuare i quiz simulazione d'esame da pc"
      );
    }
  }, []);
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
            <QuizSimNav
              questionCounter={questionCounter}
              setQuestionCounter={(id) => setQuestionCounter(parseInt(id))}
              quizQuestions={quizQuestions}
            />
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
            <QuizSimBottom
              forceCorrect={() => forceCorrect()}
              setQuestionCounter={(e) => setQuestionCounter(e)}
              questionCounter={questionCounter}
            />
            <br />

            <div className='quiz-sim_bottom_bottom'>
              <Link href='/'>
                <a>Torna alla home</a>
              </Link>

              <div className='quiz-sim_correct' onClick={correct}>
                Correggi
              </div>
            </div>
          </div>
        )}
        <UngivenModal
          setQuestionCounter={(e) => setQuestionCounter(e)}
          ungivenState={ungivenState}
          forceCorrect={forceCorrect}
          correctPopup={correctPopup}
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
