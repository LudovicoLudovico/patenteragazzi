import admin from '../firebase/nodeApp';
import { encrypt } from '../lib/enc';

export const getTheoryItem = async (slug) => {
  console.log(slug);
  var docRes;
  await admin
    .firestore()
    .collection('theory')
    .where('slug', '==', slug)
    .limit(1)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const titleEnc = encrypt(doc.data().title);
        const imageEnc = encrypt(doc.data().image);
        const theoryEnc = encrypt(doc.data().theory);
        docRes = {
          id: doc.id,
          title: titleEnc,
          theory: theoryEnc,
          image: imageEnc,
          category: doc.data().category,
        };
      });
    });

  return docRes;
};
