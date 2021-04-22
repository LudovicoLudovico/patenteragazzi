import admin from '../firebase/nodeApp';
import { encrypt } from '../lib/enc';

export const getQuestions = async () => {
  const questions = [];
  await admin
    .firestore()
    .collection('questions')
    .limit(process.env.NODE_ENV == 'development' ? 400 : 6881)
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
          isChecked: doc.data().isChecked,
          category: doc.data().category,
        });
      });
    });

  return questions;
};
