import admin from '../firebase/nodeApp';
import { encrypt } from '../lib/enc';

export const getTheory = async () => {
  const theory = [];

  if (process.env.NODE_ENV == 'development') {
    await admin
      .firestore()
      .collection('theory')
      // .limit(100)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const titleEnc = encrypt(doc.data().title);
          const imageEnc = encrypt(doc.data().image);
          const theoryEnc = encrypt(doc.data().theory);
          theory.push({
            id: doc.id,
            title: titleEnc,
            theory: theoryEnc,
            image: imageEnc,
            category: doc.data().category,
          });
        });
      });
  } else {
    await admin
      .firestore()
      .collection('theory')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const titleEnc = encrypt(doc.data().title);
          const imageEnc = encrypt(doc.data().image);
          const theoryEnc = encrypt(doc.data().theory);
          theory.push({
            id: doc.id,
            title: titleEnc,
            theory: theoryEnc,
            image: imageEnc,
            category: doc.data().category,
          });
        });
      });
  }

  return theory;
};
