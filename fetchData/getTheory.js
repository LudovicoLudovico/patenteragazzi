import admin from '../firebase/nodeApp';

export const getQuestions = async () => {
  const theory = [];
  await admin
    .firestore()
    .collection('theory')
    .limit(100)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        theory.push({
          id: doc.id,
          title: doc.data().title,
          timestamp: doc.data().timestamp,
          theory: doc.data().theory,
          image: doc.data().image,
          category: doc.data().category,
        });
      });
    });

  return theory;
};
