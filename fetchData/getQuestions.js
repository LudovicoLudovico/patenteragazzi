import admin from '../firebase/nodeApp';
import { encrypt } from '../lib/enc';

export const getQuestions = async () => {
  const questions = [];
  await admin
    .firestore()
    .collection('questions')
    .limit(6881)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const questionEnc = encrypt(doc.data().question);
        const imageEnc = encrypt(doc.data().image);
        const answerEnc = encrypt(doc.data().answer);
        questions.push({
          image: imageEnc,
          question: questionEnc,
          response: doc.data().response,
          answer: answerEnc,
          category: doc.data().category,
        });
      });
    });

  return questions;
};
