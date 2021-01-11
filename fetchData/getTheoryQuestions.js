import admin from '../firebase/nodeApp';
import { encrypt } from '../lib/enc';

export const getTheoryQuestions = async (answerId) => {
  const questions = [];
  await admin
    .firestore()
    .collection('questions')
    .where('answer', '==', answerId)
    .limit(process.env.NODE_ENV == 'development' ? 100 : 6881)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const questionEnc = encrypt(doc.data().question);
        const imageEnc = encrypt(doc.data().image);
        questions.push({
          id: doc.id,
          image: imageEnc,
          question: questionEnc,
          response: doc.data().response,
          answer: doc.data().answer,
          category: doc.data().category,
        });
      });
    });

  return questions;
};
