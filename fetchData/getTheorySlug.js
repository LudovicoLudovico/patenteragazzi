import { LiveTvOutlined } from '@material-ui/icons';
import admin from '../firebase/nodeApp';

export const getTheorySlug = async () => {
  let theory = [];

  await admin
    .firestore()
    .collection('theory')
    .doc('summary')
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        theory = doc.data().theoryList;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });

  return theory;
};
