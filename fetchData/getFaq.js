import admin from '../firebase/nodeApp';

export const getFaq = async () => {
  const faq = [];
  await admin
    .firestore()
    .collection('faq')
    .orderBy('timestamp', 'desc')
    .get()

    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        faq.push({
          id: doc.id,
          question: doc.data().question,
          answer: doc.data().answer,
        });
      });
    });

  return faq;
};
