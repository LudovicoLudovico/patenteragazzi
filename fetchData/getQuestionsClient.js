import firebase from '../firebase/clientApp';

export const getQuestionsClient = async (num) => {
  const db = firebase.firestore();
  const questionsCollection = db.collection('questions');

  let questions = [];

  for (let i = 0; i < num; i++) {
    const rand = Math.floor(Math.random() * 925);
    await questionsCollection
      .where('num', '==', rand)
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          questions.push({
            id: doc.id,
            question: doc.data().question,
            image: doc.data().image,
            answer: doc.data().answer,
            response: doc.data().response,
            timestamp: doc.data().timestamp,
          });
        });
      });
  }

  return questions;
};
