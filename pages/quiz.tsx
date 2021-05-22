import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { decrypt } from '../lib/enc';
import { useUser } from '../context/userContext';
import firebase from '../firebase/clientApp';

// Fetching data
import { getQuestions } from '../fetchData/getQuestions';
import { getTheory } from '../fetchData/getTheory';
import dynamic from 'next/dynamic';
// import questions from '../questionTest';
// import theory from '../theoryTest';

// Components
import Seo from '../components/general/Seo';
import Quiz from '../components/quiz/Quiz';
import QuizSim from '../components/quizSim/QuizSim';

const TopicChoice = dynamic(() => import('../components/quiz/TopicChoice'));
const UngivenModal = dynamic(() => import('../components/quiz/UngivenModal'));
const Score = dynamic(() => import('../components/quiz/Score'));

import '../style/quiz.min.css';

// Functional Component
const test = ({
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  q,
  r,
  s,
  t,
  u,
  v,
  w,
  y,
  x,
  theory,
}) => {
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
  const [questions] = useState([
    ...a,
    ...b,
    ...c,
    ...d,
    ...e,
    ...f,
    ...g,
    ...h,
    ...i,
    ...j,
    ...k,
    ...l,
    ...m,
    ...n,
    ...o,
    ...p,
    ...q,
    ...r,
    ...s,
    ...t,
    ...u,
    ...v,
    ...w,
    ...y,
    ...x,
  ]);

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
    for (let i = 0; i < questionDistribution.length; i++) {
      if (questionDistribution[i] !== 'Altro') {
        const filteredArray = questions.filter(
          (val) => val.category === questionDistribution[i]
        );

        console.log(`${i} -> ${filteredArray} - ${questionDistribution[i]}`);

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

            extractedNums.push(num);
          }
        }
      }
    }

    setQuizQuestions(questionCopy);
  };

  useEffect(() => {
    if (router.query.tipo !== 'super' && router.query.tipo !== 'argomenti') {
      filterAndSet();
    }

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
    if (score !== 0) {
      if (user) {
        const error = 40 - score;
        console.log(error);
        console.log(user);
        console.log(user.user_id);
        firebase
          .firestore()
          .collection('users')
          .doc(user.user_id)
          .set(
            {
              quizErrors: firebase.firestore.FieldValue.arrayUnion(error),
            },
            { merge: true }
          )
          .then(() => {
            let localStats = JSON.parse(localStorage.getItem('stats'));
            if (localStats) {
              localStats = {
                quizCounter: localStats.quizErrors.length + 1,
                quizErrors: [...localStats.quizErrors, 40 - score],
              };
              localStorage.setItem('stats', JSON.stringify(localStats));
            }

            setShowScore(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setShowScore(true);
      }
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
    console.log('called correct');

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

  const getAnswer = useCallback((index, answer, isSim) => {
    if (!isSim) {
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
    } else {
      if (index + 1 !== 40) {
        let answersCopy = answers;
        answersCopy[index] = answer;
        setAnswers(answersCopy);
      } else {
        let answersCopy = [...answers];
        answersCopy[index] = answer;

        setAnswers(answersCopy);

        setCorrectPopup(true);
      }
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

      {router.query.tipo == 'simulazione' && !showScore && (
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
  const a = await getQuestions(
    "Definizioni generali e doveri nell'uso della strada"
  );
  const b = await getQuestions('Segnali di pericolo');
  const c = await getQuestions('Segnali di divieto');
  const d = await getQuestions('Segnali di obbligo');
  const e = await getQuestions('Segnali di precedenza');
  const f = await getQuestions(
    'Segnaletica orizzontale e segni sugli ostacoli'
  );
  const g = await getQuestions(
    'Segnalazioni semaforiche e degli agenti del traffico'
  );
  const h = await getQuestions('Segnali di indicazione');
  const i = await getQuestions(
    'Segnali complementari, segnali temporanei e di cantiere'
  );
  const j = await getQuestions('Pannelli integrativi dei segnali');
  const k = await getQuestions(
    'Limiti di velocità, pericolo e intralcio alla circolazione'
  );
  const l = await getQuestions('Distanza di sicurezza');
  const m = await getQuestions('Norme sulla circolazione dei veicoli');
  const n = await getQuestions('Ordine di precedenza agli incroci');
  const o = await getQuestions('Fermata, sosta, arresto');
  const p = await getQuestions('Norme varie');
  const q = await getQuestions(
    'Uso delle luci e dei dispositivi acustici, spie e simboli'
  );
  const r = await getQuestions(
    'Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza'
  );
  const s = await getQuestions(
    'Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti'
  );
  const t = await getQuestions(
    'Incidenti stradali e comportamenti in caso di incidente'
  );
  const u = await getQuestions(
    'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'
  );
  const v = await getQuestions(
    'Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'
  );
  const w = await getQuestions(
    "Limitazione dei consumi, rispetto dell'ambiente e inquinamento"
  );
  const y = await getQuestions(
    'Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e tenuta di strada, comportamenti e cautele di guida'
  );
  const x = await getQuestions('Norme sul sorpasso');

  const theoryRaw = await getTheory();

  return {
    props: {
      a: JSON.parse(JSON.stringify(a)),
      b: JSON.parse(JSON.stringify(b)),
      c: JSON.parse(JSON.stringify(c)),
      d: JSON.parse(JSON.stringify(d)),
      e: JSON.parse(JSON.stringify(e)),
      f: JSON.parse(JSON.stringify(f)),
      g: JSON.parse(JSON.stringify(g)),
      h: JSON.parse(JSON.stringify(h)),
      i: JSON.parse(JSON.stringify(i)),
      j: JSON.parse(JSON.stringify(j)),
      k: JSON.parse(JSON.stringify(k)),
      l: JSON.parse(JSON.stringify(l)),
      m: JSON.parse(JSON.stringify(m)),
      n: JSON.parse(JSON.stringify(n)),
      o: JSON.parse(JSON.stringify(o)),
      p: JSON.parse(JSON.stringify(p)),
      q: JSON.parse(JSON.stringify(q)),
      r: JSON.parse(JSON.stringify(r)),
      s: JSON.parse(JSON.stringify(s)),
      t: JSON.parse(JSON.stringify(t)),
      u: JSON.parse(JSON.stringify(u)),
      v: JSON.parse(JSON.stringify(v)),
      w: JSON.parse(JSON.stringify(w)),
      y: JSON.parse(JSON.stringify(y)),
      x: JSON.parse(JSON.stringify(x)),
      theory: JSON.parse(JSON.stringify(theoryRaw)),
    },
  };
}

export default test;
