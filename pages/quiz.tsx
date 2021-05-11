// General imports
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { decrypt } from '../lib/enc';
import { useUser } from '../context/userContext';
import firebase from '../firebase/clientApp';

// Fetching data
import { getQuestions } from '../fetchData/getQuestions';
import { getTheory } from '../fetchData/getTheory';
import dynamic from 'next/dynamic';
import questions from '../questionTest';
import theory from '../theoryTest';

// Components
import Seo from '../components/general/Seo';
import Quiz from '../components/quiz/Quiz';
import QuizSim from '../components/quizSim/QuizSim';

const TopicChoice = dynamic(() => import('../components/quiz/TopicChoice'));
const UngivenModal = dynamic(() => import('../components/quiz/UngivenModal'));
const Score = dynamic(() => import('../components/quiz/Score'));

import '../style/quiz.min.css';

// Functional Component
const test = ({ questions, theory }) => {
  // const test = () => {
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
  const [categories, setCategories] = useState([]);

  const { user } = useUser();

  const questionDistribution = [
    'Segnali di pericolo',
    'Segnali di divieto',
    'Segnali di obbligo',
    'Segnali di precedenza',
    'Segnaletica orizzontale e segni sugli ostacoli',
    'Segnalazioni semaforiche e degli agenti del traffico',
    'Limiti di velocità, pericolo e intralcio alla circolazione',
    'Distanza di sicurezza',
    'Norme sulla circolazione dei veicoli',
    'Ordine di precedenza agli incroci',
    'Norme sul sorpasso',
    'Norme varie',
    'Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza',
    'Incidenti stradali e comportamenti in caso di incidente',
    'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso',
    'Altro',
  ];

  const filterAndSet = () => {
    const questionCopy = [];
    const categoriesCopy = [];

    for (let i = 0; i < questionDistribution.length; i++) {
      if (questionDistribution[i] !== 'Altro') {
        const filteredArray = questions.filter(
          (val) => val.category === questionDistribution[i]
        );
        let extractedNums = [];

        while (extractedNums.length < 2) {
          const num = Math.floor(Math.random() * filteredArray.length);
          if (!extractedNums.includes(num)) {
            questionCopy.push({
              question: decrypt(filteredArray[num].question),
              image: decrypt(filteredArray[num].image),
              response: filteredArray[num].response,
              answer: filteredArray[num].answer,
              category: filteredArray[num].category,
              questionId: filteredArray[num].questionId,
            });

            categoriesCopy.push(filteredArray[num].category);

            extractedNums.push(num);
          }
        }
      } else {
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
            questionCopy.push({
              question: decrypt(filteredArray[num].question),
              image: decrypt(filteredArray[num].image),
              response: filteredArray[num].response,
              answer: filteredArray[num].answer,
              category: filteredArray[num].category,
              questionId: filteredArray[num].id,
            });
            categoriesCopy.push(filteredArray[num].category);
            extractedNums.push(num);
          }
        }
      }
    }
    setCategories(categoriesCopy);
    setQuizQuestions(questionCopy);
  };

  useEffect(() => {
    if (router.query.tipo !== 'super' && router.query.tipo !== 'argomenti') {
      filterAndSet();
    }
    console.log(router.query.tipo);
    if (router.query.tipo == 'super') {
      const filteredArray = questions.filter(
        (val) => val.difficulty === 'high'
      );

      const questionCopy = [];
      const categoriesCopy = [];

      let extractedNums = [];

      while (extractedNums.length < 40) {
        const num = Math.floor(Math.random() * filteredArray.length);
        if (!extractedNums.includes(num)) {
          questionCopy.push({
            question: decrypt(filteredArray[num].question),
            image: decrypt(filteredArray[num].image),
            response: filteredArray[num].response,
            answer: filteredArray[num].answer,
            category: filteredArray[num].category,
            questionId: filteredArray[num].questionId,
          });

          categoriesCopy.push(filteredArray[num].category);

          extractedNums.push(num);
        }
      }

      setQuizQuestions(questionCopy);
    }
  }, []);

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
    if (user && score !== 0) {
      firebase
        .firestore()
        .collection('users')
        .doc(user.user_id)
        .set(
          {
            quizCounter: firebase.firestore.FieldValue.increment(1),
            quizErrors: firebase.firestore.FieldValue.arrayUnion(40 - score),
          },
          {
            merge: true,
          }
        )
        .then(() => {
          setShowScore(true);

          if (localStats) {
            localStats = {
              quizCounter: localStats.quizCounter + 1,
              quizErrors: [...localStats.quizErrors, 40 - score],
            };
            localStorage.setItem('stats', JSON.stringify(localStats));
          }
        })
        .catch((error) => {
          console.log(error);
        });

      let localStats = JSON.parse(localStorage.getItem('stats'));
    }
  }, [score]);

  const loopCorrect = () => {
    let quizQuestionsCopy = [...quizQuestions];
    let scoreCopy = 0;
    let wrongAnswerCopy = [];

    for (let i = 0; i < 40; i++) {
      if (answers[i] === quizQuestionsCopy[i].response) {
        scoreCopy += 1;
      } else {
        const resBool =
          answers[i] === undefined || answers[i] === null
            ? null
            : !quizQuestionsCopy[i].response;

        wrongAnswerCopy.push({
          userResponse: resBool,
          question: quizQuestionsCopy[i].question,
          response: quizQuestionsCopy[i].response,
          image: quizQuestionsCopy[i].image,
          answer: quizQuestionsCopy[i].answer,
          category: quizQuestionsCopy[i].category,
          questionId: quizQuestionsCopy[i].questionId,
          isChecked: quizQuestionsCopy[i].isChecked || null,
          num: i,
        });
      }
    }

    setWrongAnswers(wrongAnswerCopy);
    setScore(scoreCopy);
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

  const getAnswer = useCallback((index, answer) => {
    if (index + 1 !== 40) {
      if (router.query.tipo !== 'simulazione') {
        setQuestionCounter((prevState) => prevState + 1);
      }
      let answersCopy = answers;
      answersCopy[index] = answer;
      setAnswers(answersCopy);
    } else {
      setQuestionCounter(index);
      let answersCopy = [...answers];
      answersCopy[index] = answer;

      setAnswers(answersCopy);

      setCorrectPopup(true);
    }
  }, []);

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

      {router.query.tipo !== 'argomenti' &&
        router.query.tipo !== 'simulazione' &&
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
          <QuizSim
            correct={correct}
            questionCounter={questionCounter}
            quizQuestions={quizQuestions}
            getAnswer={getAnswer}
            setQuestionCounter={setQuestionCounter}
          />
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
            <TopicChoice
              filters={filters}
              setFilters={setFilters}
              startQuiz={startQuiz}
            />
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
