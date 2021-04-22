import React from 'react';
import firebase from 'firebase';
import slugify from 'slugify';
const questionItem = () => {
  const slugifyAllQuestions = () => {
    firebase
      .firestore()
      .collection('questions')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const slug = slugify(doc.data().question, {
            lower: true,
            remove: /[*+~()#'"!:@]/g,
          });

          firebase
            .firestore()
            .collection('questions')
            .doc('summary')
            .update({
              questionsList: firebase.firestore.FieldValue.arrayUnion(slug),
            });

          firebase.firestore().collection('questions').doc(doc.id).update({
            slug,
          });
          // questions.push({
          //   id: doc.id,
          //   image: imageEnc,
          //   question: questionEnc,
          //   response: doc.data().response,
          //   answer: doc.data().answer,
          //   isChecked: doc.data().isChecked,
          //   category: doc.data().category,
          // });
        });
      });
  };

  return (
    <div>
      <button onClick={slugifyAllQuestions}>Slugify</button>
    </div>
  );
};

export default questionItem;
