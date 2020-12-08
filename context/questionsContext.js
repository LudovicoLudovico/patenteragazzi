import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../firebase/clientApp';

export const QuestionsContext = createContext();

export default function QuestionsContextComp({ children }) {
  const db = firebase.firestore();
  const questionsCollection = db.collection('questions');
  // const [extracted, setExtracted] = useState([]);
  const [questions, setQuestions] = useState([]);
  let extracted = [];

  const resetQuestions = () => {
    setQuestions([]);
  };

  const getQuestions = async () => {
    const numQuestions = 1603;
    let indexes1 = [];
    let indexes2 = [];

    for (let i = 0; i < 10; i++) {
      const rand = Math.floor(Math.random() * numQuestions);
      if (!extracted.includes(rand)) {
        extracted.push(rand);

        console.log(extracted);
        indexes1.push(rand);
      } else {
        i--;
      }
    }
    for (let i = 0; i < 10; i++) {
      const rand = Math.floor(Math.random() * numQuestions);
      if (!extracted.includes(rand)) {
        extracted.push(rand);
        indexes2.push(rand);
      } else {
        i--;
      }
    }

    await questionsCollection
      .where('num', 'in', indexes1)
      .limit(10)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setQuestions((questions) => [
            ...questions,
            {
              id: doc.id,
              question: doc.data().question,
              image: doc.data().image,
              answer: doc.data().answer,
              response: doc.data().response,
              timestamp: doc.data().timestamp,
            },
          ]);
        });
      });
    await questionsCollection
      .where('num', 'in', indexes2)
      .limit(10)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setQuestions((questions) => [
            ...questions,
            {
              id: doc.id,
              question: doc.data().question,
              image: doc.data().image,
              answer: doc.data().answer,
              response: doc.data().response,
              timestamp: doc.data().timestamp,
            },
          ]);
        });
      });

    console.log(extracted.sort());
    return questions;
  };

  return (
    <QuestionsContext.Provider
      value={{ getQuestions, questions, resetQuestions }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useQuestions = () => useContext(QuestionsContext);
