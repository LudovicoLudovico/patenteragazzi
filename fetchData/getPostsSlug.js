import admin from '../firebase/nodeApp';
import { encrypt } from '../lib/enc';

export const getPostsSlug = async () => {
  const slugs = [];
  await admin
    .firestore()
    .collection('posts')
    .doc('list')
    .get()
    .then((doc) => {
      if (doc.exists) {
        doc.data().postSlugs.map((slug) => {
          slugs.push(slug);
        });
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });

  return slugs;
};
