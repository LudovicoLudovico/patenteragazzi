import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import MDEditor from '@uiw/react-md-editor';

const UpdateTheory = () => {
  const [searchTheory, setSearchTheory] = useState('');
  const [theoryToUpdate, setTheoryToUpdate] = useState('');
  const [theoryId, setTheoryId] = useState('');
  return (
    <div>
      <h2>Modifica teoria</h2>
      <br />
      <TextField
        id='outlined-multiline-flexible'
        label='Cerca teoria (titolo)
          '
        multiline
        rowsMax={10}
        onChange={(e) => setSearchTheory(e.target.value)}
        value={searchTheory}
        variant='outlined'
      />
      <Button
        variant='contained'
        onClick={() => {
          firebase
            .firestore()
            .collection('theory')
            .where('title', '==', searchTheory)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                setTheoryToUpdate(doc.data().theory);
                setTheoryId(doc.id);
              });
            })
            .catch(function (error) {
              console.log('Error getting documents: ', error);
            });
        }}
      >
        Cerca domanda
      </Button>

      <MDEditor value={theoryToUpdate} onChange={setTheoryToUpdate} />

      <Button
        variant='contained'
        onClick={() => {
          firebase.firestore().collection('theory').doc(theoryId).update({
            theory: theoryToUpdate,
          });

          setTheoryId('');
          setTheoryToUpdate('');
          setSearchTheory('');
        }}
      >
        Modifica teoria
      </Button>
    </div>
  );
};

export default UpdateTheory;
