//Next/React imports
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

//Getting data
import { getQuestions } from '../fetchData/getQuestions';
import { getTheory } from '../fetchData/getTheory';

//Material UI
import { Button } from '@material-ui/core';

//Components
import { decrypt } from '../lib/enc';

//Components
import Seo from '../components/Seo';
import QuizTopicsList from '../components/quiz/QuizTopicsList';

const QuizBottom = dynamic(() => import('../components/quiz/QuizBottom'));
const QuizTop = dynamic(() => import('../components/quiz/QuizTop'));
const QuizComp = dynamic(() => import('../components/quiz/QuizComp'));
const UngivenModal = dynamic(() => import('../components/quiz/UngivenModal'));
const Score = dynamic(() => import('../components/quiz/Score'));

//Style
import '../style/quizTopics.min.css';

//Topic Quiz Function
const quizArgomenti = ({ questions, theory }) => {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [answers, setAnswers] = useState(new Array(40));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
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
              questionId: questions[rand].id,
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
              questionId: quizQuestionsCopy[i].questionId,
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
              questionId: quizQuestionsCopy[i].questionId,
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

  return (
    <>
      <Seo
        title='Quiz Argomenti Patente Online AM/B'
        description='Più di 7000 domande della patente AM/B'
        canonical='https://patenteragazzi.it/quiz-argomenti'
      />

      {/* Do quiz */}
      {showQuiz && (
        <div className='quiz' id='quiz'>
          <div className='container'>
            {!showScore && showQuiz && (
              <div className='standard_quiz'>
                <QuizTop correct={correct} />
                {quizQuestions.map((question, index) => {
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
                })}
                {/* Bottom Navigation */}
                <QuizBottom
                  questionCounter={questionCounter}
                  quizQuestions={quizQuestions}
                  setQuestionCounter={(index) =>
                    setQuestionCounter(parseInt(index))
                  }
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

            {showScore && showQuiz && (
              <Score
                showScore={showScore}
                score={score}
                wrongAnswers={wrongAnswers}
                theory={theory}
                quizQuestions={quizQuestions}
                answers={answers}
              />
            )}
          </div>
        </div>
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
  );
};

// Getting data at build time
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
