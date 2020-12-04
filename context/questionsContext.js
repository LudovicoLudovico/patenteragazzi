import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../firebase/clientApp';
//import admin from '../firebase/nodeApp';

export const QuestionsContext = createContext();

export default function QuestionsContextComp({ children }) {
  const [questions, setQuestions] = useState([]);

  const getQuestionsClient = async () => {
    const db = firebase.firestore();
    const questionsCollection = db.collection('questions');

    for (let i = 0; i < 20; i++) {
      const rand = Math.floor(Math.random() * 925);
      await questionsCollection
        .where('num', '==', rand)
        .limit(1)
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
    }
  };

  return (
    <QuestionsContext.Provider value={{ questions, getQuestionsClient }}>
      {children}
    </QuestionsContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useQuestions = () => useContext(QuestionsContext);
