// General imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { decrypt } from '../lib/enc';

// Fetching data
import { getQuestions } from '../fetchData/getQuestions';
import { getTheory } from '../fetchData/getTheory';
import dynamic from 'next/dynamic';

// Components
import Seo from '../components/Seo';
import Quiz from '../components/quiz/Quiz';
import UngivenModal from '../components/quiz/UngivenModal';
import Score from '../components/quiz/Score';
import QuizSimComp from '../components/quizSim/QuizSimComp';
import QuizSimNav from '../components/quizSim/QuizSimNav';
import QuizSimBottom from '../components/quizSim/QuizSimBottom';
import QuizTopicsList from '../components/quiz/QuizTopicsList';
import Link from 'next/link';

import { Button } from '@material-ui/core';

// Css Import
import '../style/quizSim.min.css';
import '../style/quizTopics.min.css';

// Functional Component
const test = ({ questions, theory }) => {
  const router = useRouter();
  const [questionCounter, setQuestionCounter] = useState(0);
  const [answers, setAnswers] = useState(new Array(40));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctPopup, setCorrectPopup] = useState(false);
  const [ungivenState, setUngivenState] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    console.log(router.query.tipo);

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

    // if (router.query.tipo !== 'argomenti' && 'simulazione') {
    //   let extractedNums = [];
    //   while (extractedNums.length < 40) {
    //     const num = Math.floor(Math.random() * questions.length);
    //     if (!extractedNums.includes(num)) {
    //       extractedNums.push(num);
    //       const {
    //         question,
    //         image,
    //         response,
    //         answer,
    //         category,
    //         questionId,
    //         isChecked,
    //       } = questions[num];
    //       setQuizQuestions((quizQuestions) => [
    //         ...quizQuestions,
    //         {
    //           question: decrypt(question),
    //           image: decrypt(image),
    //           response,
    //           answer,
    //           category,
    //           questionId,
    //           isChecked: isChecked || null,
    //         },
    //       ]);
    //     }
    //   }
    // }
  }, []);

  const filterAndSet = (category: string, num: number) => {
    const filteredArray = questions.filter((val) => val.category === category);
    let extractedNums = [];
    while (extractedNums.length < num) {
      const num = Math.floor(Math.random() * filteredArray.length);
      if (!extractedNums.includes(num)) {
        extractedNums.push(num);
      }
    }

    setQuizQuestions((quizQuestions) => [
      ...quizQuestions,
      {
        question: decrypt(filteredArray[extractedNums[0]].question),
        image: decrypt(filteredArray[extractedNums[0]].image),
        response: filteredArray[extractedNums[0]].response,
        answer: filteredArray[extractedNums[0]].answer,
        category: filteredArray[extractedNums[0]].category,
        questionId: filteredArray[extractedNums[0]].id,
      },
    ]);
    setQuizQuestions((quizQuestions) => [
      ...quizQuestions,
      {
        question: decrypt(filteredArray[extractedNums[1]].question),
        image: decrypt(filteredArray[extractedNums[1]].image),
        response: filteredArray[extractedNums[1]].response,
        answer: filteredArray[extractedNums[1]].answer,
        category: filteredArray[extractedNums[1]].category,
        questionId: filteredArray[extractedNums[1]].id,
      },
    ]);
  };

  const filterAndSetSecondary = () => {
    const filteredArray = questions.filter((val) => {
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

    let extractedNums = [];
    while (extractedNums.length < 10) {
      const num = Math.floor(Math.random() * filteredArray.length);
      if (!extractedNums.includes(num)) {
        extractedNums.push(num);
      }
    }

    for (let i = 0; i < 10; i++) {
      setQuizQuestions((quizQuestions) => [
        ...quizQuestions,
        {
          question: decrypt(filteredArray[extractedNums[i]].question),
          image: decrypt(filteredArray[extractedNums[i]].image),
          response: filteredArray[extractedNums[i]].response,
          answer: filteredArray[extractedNums[i]].answer,
          category: filteredArray[extractedNums[i]].category,
          questionId: filteredArray[extractedNums[i]].id,
        },
      ]);
    }
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

  const loopCorrect = () => {
    let quizQuestionsCopy = [...quizQuestions];

    for (let i = 0; i < 40; i++) {
      if (answers[i] === quizQuestionsCopy[i].response) {
        setScore((prevState) => prevState + 1);
      } else {
        const resBool =
          answers[i] === undefined || answers[i] === null
            ? null
            : !quizQuestionsCopy[i].response;

        setWrongAnswers((wrongAnswers) => [
          ...wrongAnswers,
          {
            userResponse: resBool,
            question: quizQuestionsCopy[i].question,
            response: quizQuestionsCopy[i].response,
            image: quizQuestionsCopy[i].image,
            answer: quizQuestionsCopy[i].answer,
            category: quizQuestionsCopy[i].category,
            questionId: quizQuestionsCopy[i].questionId,
            isChecked: quizQuestionsCopy[i].isChecked || null,
            num: i,
          },
        ]);
      }
    }

    setShowScore(true);
  };
  const correct = (performCheck: boolean) => {
    if (performCheck) {
      checkUngiven();

      if (ungivenState.position.length === 0) {
        loopCorrect();
      } else {
        setCorrectPopup(true);
      }
    } else {
      loopCorrect();
    }
  };

  const getAnswer = (index, answer) => {
    if (questionCounter + 1 !== quizQuestions.length) {
      if (router.query.tipo !== 'simulazione') {
        setQuestionCounter((prevState) => prevState + 1);
      }
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

  const startQuiz = async () => {
    setQuizQuestions([]);
    const questsFiltered = questions.filter((item) => {
      return filters.includes(item.category);
    });

    if (questsFiltered.length >= 40) {
      let extractedNums = [];
      while (extractedNums.length < 40) {
        const num = Math.floor(Math.random() * questsFiltered.length);
        if (!extractedNums.includes(num)) {
          setQuizQuestions((quizQuestions) => [
            ...quizQuestions,
            {
              question: decrypt(questsFiltered[num].question),
              image: decrypt(questsFiltered[num].image),
              response: questsFiltered[num].response,
              answer: questsFiltered[num].answer,
              category: questsFiltered[num].category,
              questionId: questsFiltered[num].id,
            },
          ]);
          extractedNums.push(num);
        }
      }

      // for (let i = 0; i < 40; i++) {
      //   setQuizQuestions((quizQuestions) => [
      //     ...quizQuestions,
      //     {
      //       question: decrypt(questsFiltered[extractedNums[i]].question),
      //       image: decrypt(questsFiltered[extractedNums[i]].image),
      //       response: questsFiltered[extractedNums[i]].response,
      //       answer: questsFiltered[extractedNums[i]].answer,
      //       category: questsFiltered[extractedNums[i]].category,
      //       questionId: questsFiltered[extractedNums[i]].id,
      //     },
      //   ]);
      // }

      setShowQuiz(true);
    } else {
      alert('Domande insufficienti selezionare altre categorie');
    }
  };

  return (
    <>
      <Seo
        title='Quiz Patente Online AM/B'
        description="Con i nostri quiz contenti 7000 domande della patente AM/B, puoi allenarti sulle stesse domande che troverai all'esame"
        canonical='https://patenteragazzi.it/quiz'
      />

      {router.query.tipo == 'normale' &&
        quizQuestions.length !== 0 &&
        !showScore && (
          <Quiz
            correct={correct}
            questionCounter={questionCounter}
            quizQuestions={quizQuestions}
            getAnswer={getAnswer}
            setQuestionCounter={setQuestionCounter}
          />
        )}

      {router.query.tipo == 'simulazione' &&
        quizQuestions.length !== 0 &&
        !showScore && (
          <div className='quiz-sim'>
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
                forceCorrect={() => correct(false)}
                setQuestionCounter={(e) => setQuestionCounter(e)}
                questionCounter={questionCounter}
              />
              <br />

              <div className='quiz-sim_bottom_bottom'>
                <Link href='/'>
                  <a>Torna alla home</a>
                </Link>

                <div className='quiz-sim_correct' onClick={() => correct(true)}>
                  Correggi
                </div>
              </div>
            </div>
          </div>
        )}
      {router.query.tipo == 'argomenti' && !showScore && (
        <>
          {showQuiz && (
            <Quiz
              correct={correct}
              questionCounter={questionCounter}
              quizQuestions={quizQuestions}
              getAnswer={getAnswer}
              setQuestionCounter={setQuestionCounter}
            />
          )}

          {/* Chose the topics of the quiz */}
          {!showQuiz && (
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
                    <Link href='/' passHref>
                      <a style={{ textDecoration: 'none' }}>
                        <Button variant='contained' className='close_quiz'>
                          Esci
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
                {/* Theory List */}
                <QuizTopicsList
                  filters={filters}
                  setFilters={(e) => setFilters(e)}
                />
              </div>
            </div>
          )}
        </>
      )}

      <UngivenModal
        setQuestionCounter={(e) => setQuestionCounter(e)}
        ungivenState={ungivenState}
        correctPopup={correctPopup}
        correct={correct}
        setCorrectPopup={(e) => setCorrectPopup(e)}
      />

      {showScore && (
        <Score
          showScore={showScore}
          quizQuestions={quizQuestions}
          answers={answers}
          score={score}
          wrongAnswers={wrongAnswers}
          theory={theory}
        />
      )}
    </>
  );
};

export async function getStaticProps() {
  const questionsRaw = await getQuestions();
  const theoryRaw = await getTheory();

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questionsRaw)),
      theory: JSON.parse(JSON.stringify(theoryRaw)),
    },
  };
}

export default test;
