import admin from '../firebase/nodeApp';
import { encrypt } from '../lib/enc';

export const getPostItem = async (slug) => {
  let post = {};
  await admin
    .firestore()
    .collection('posts')
    .where('slug', '==', slug)
    .limit(1)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const textEnc = encrypt(doc.data().text);

        post = {
          title: doc.data().title,
          text: textEnc,
          slug: doc.data().slug,
        };
      });
    });

  return post;
};
