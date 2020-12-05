import firebase from '../firebase/clientApp';

export const getQuestionsClient = async () => {
  const db = firebase.firestore();
  const questionsCollection = db.collection('questions');

  let questions = [];
  let indexes1 = [
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
  ];
  let indexes2 = [
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
  ];
  let indexes3 = [
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
  ];
  let indexes4 = [
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
    Math.floor(Math.random() * 925),
  ];
  await questionsCollection
    .where('num', 'in', indexes1)
    .limit(10)
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
  await questionsCollection
    .where('num', 'in', indexes2)
    .limit(10)
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
  await questionsCollection
    .where('num', 'in', indexes3)
    .limit(10)
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
  await questionsCollection
    .where('num', 'in', indexes4)
    .limit(10)
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

  return questions;
};
