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
        docRes = {
          id: doc.id,
          title: doc.data().title,
          theory: doc.data().theory,
          image: doc.data().image,
          category: doc.data().category,
        };
      });
    });

  return docRes;
};
