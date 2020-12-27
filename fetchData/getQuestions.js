import admin from '../firebase/nodeApp';
import { encrypt, decrypt } from '../lib/enc';

export const getQuestions = async () => {
  const questions = [];
  await admin
    .firestore()
    .collection('questions')
    .limit(5736)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        questions.push({
          id: doc.id,
          num: doc.data().num,
          image: doc.data().image,
          question: doc.data().question,
          response: doc.data().response,
          answer: doc.data().answer,
          category: doc.data().category,
        });
      });
    });

  // return encrypt(JSON.stringify(questions));
  return questions;
};
