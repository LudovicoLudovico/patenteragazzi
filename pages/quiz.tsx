//Next/React imports
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Decryption
import { decrypt } from '../lib/enc';

// Context/Fetch
import { getQuestions } from '../fetchData/getQuestions';
import { getTheory } from '../fetchData/getTheory';

// Components
import Seo from '../components/Seo';
import QuizCompFirst from '../components/quiz/QuizCompFirst';

const QuizComp = dynamic(() => import('../components/quiz/QuizComp'));
const QuizBottom = dynamic(() => import('../components/quiz/QuizBottom'));
const QuizTop = dynamic(() => import('../components/quiz/QuizTop'));
const UngivenModal = dynamic(() => import('../components/quiz/UngivenModal'));
const Score = dynamic(() => import('../components/quiz/Score'));

// Css Import
import '../style/quiz.min.css';

interface newQuizProps {
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

// Quiz Function
const newQuiz = ({ questions, theory }: newQuizProps) => {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [answers, setAnswers] = useState(new Array(40));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctPopup, setCorrectPopup] = useState(false);
  const [ungivenState, setUngivenState] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    let extractedNums = [];
    while (extractedNums.length < 40) {
      const num = Math.floor(Math.random() * questions.length);
      if (!extractedNums.includes(num)) {
        extractedNums.push(num);
      }
    }

    for (let i = 0; i < 40; i++) {
      setQuizQuestions((quizQuestions) => [
        ...quizQuestions,
        {
          question: decrypt(questions[extractedNums[i]].question),
          image: decrypt(questions[extractedNums[i]].image),
          response: questions[extractedNums[i]].response,
          answer: questions[extractedNums[i]].answer,
          category: questions[extractedNums[i]].category,
          questionId: questions[extractedNums[i]].id,
        },
      ]);
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
              questionId: quizQuestionsCopy[i].questionId,
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

  //If 5 questions are loaded then display UI, in the meantime display
  //a loading screen with rotating icon
  if (quizQuestions.length !== 0) {
    return (
      <>
        <Seo
          title='Quiz Patente Online AM/B'
          description="Con i nostri quiz contenti 7000 domande della patente AM/B, puoi allenarti sulle stesse domande che troverai all'esame"
          canonical='https://patenteragazzi.it/quiz'
        />

        <div className='quiz' id='quiz'>
          {!showScore && (
            <div className='standard_quiz'>
              {/* Quiz Top */}
              <QuizTop
                correct={correct}
                questionCounter={questionCounter}
                quizQuestions={quizQuestions}
              />

              <QuizCompFirst
                key={0}
                questionCounter={questionCounter}
                index={0}
                question={quizQuestions[0]}
                getTrueAnswer={() => {
                  getAnswer(0, true);
                }}
                getFalseAnswer={() => {
                  getAnswer(0, false);
                }}
              />
              {/* If there are quizQuestions in the state then display question, image and modal */}
              {quizQuestions.map((question, index) => {
                if (index !== 0) {
                  return (
                    <QuizComp
                      key={index}
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
                }
              })}

              {/* Bottom Navigation */}
              <QuizBottom
                questionCounter={questionCounter}
                quizQuestions={quizQuestions}
                setQuestionCounter={(index) => setQuestionCounter(index)}
              />
            </div>
          )}

          <UngivenModal
            setQuestionCounter={(e) => setQuestionCounter(e)}
            ungivenState={ungivenState}
            correctPopup={correctPopup}
            forceCorrect={forceCorrect}
            setCorrectPopup={(e) => setCorrectPopup(e)}
          />

          <Score
            showScore={showScore}
            quizQuestions={quizQuestions}
            answers={answers}
            score={score}
            wrongAnswers={wrongAnswers}
            theory={theory}
          />
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

//Getting data during build
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
