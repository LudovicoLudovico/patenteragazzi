import firebase from '../firebase/clientApp';

export const getQuestionsClient = async () => {
  const db = firebase.firestore();
  const questionsCollection = db.collection('questions');

  let questions = [];

  let extracted = [];
  let indexes1 = [];
  let indexes2 = [];
  let indexes3 = [];
  let indexes4 = [];

  for (let i = 0; i < 10; i++) {
    const rand = Math.floor(Math.random() * 925);
    if (!extracted.includes(rand)) {
      extracted.push(rand);
      indexes1.push(rand);
    } else {
      i--;
    }
  }
  for (let i = 0; i < 10; i++) {
    const rand = Math.floor(Math.random() * 925);
    if (!extracted.includes(rand)) {
      extracted.push(rand);
      indexes2.push(rand);
    } else {
      i--;
    }
  }
  for (let i = 0; i < 10; i++) {
    const rand = Math.floor(Math.random() * 925);
    if (!extracted.includes(rand)) {
      extracted.push(rand);
      indexes3.push(rand);
    } else {
      i--;
    }
  }
  for (let i = 0; i < 10; i++) {
    const rand = Math.floor(Math.random() * 925);
    if (!extracted.includes(rand)) {
      extracted.push(rand);
      indexes4.push(rand);
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
