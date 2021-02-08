import admin from '../firebase/nodeApp';
import { encrypt } from '../lib/enc';

export const getPosts = async () => {
  const posts = [];
  await admin
    .firestore()
    .collection('posts')
    .orderBy('timestamp', 'desc')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const textEnc = encrypt(doc.data().text);
        posts.push({
          title: doc.data().title,
          text: textEnc,
          slug: doc.data().slug,
          description: doc.data().description,
        });
      });
    });

  return posts;
};
