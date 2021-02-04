import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import MDEditor from '@uiw/react-md-editor';

const UpdateTheory = () => {
  const [searchTheory, setSearchTheory] = useState('');
  const [searchImage, setSearchImage] = useState('');
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
      <br />
      <br />
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
                setSearchImage(doc.data().image);
              });
            })
            .catch(function (error) {
              console.log('Error getting documents: ', error);
            });
        }}
      >
        Cerca teoria
      </Button>
      <br />
      <br />
      <img src={searchImage} alt='' />
      <TextField
        id='outlined-multiline-flexible'
        label='Link immagine
          '
        style={{
          width: '100%',
        }}
        onChange={(e) => setSearchImage(e.target.value)}
        value={searchImage}
        variant='outlined'
      />
      <br />
      <br />
      <br />
      <br />
      <MDEditor
        value={theoryToUpdate}
        onChange={setTheoryToUpdate}
        height={500}
      />

      <br />

      <Button
        variant='contained'
        onClick={() => {
          firebase.firestore().collection('theory').doc(theoryId).update({
            theory: theoryToUpdate,
            image: searchImage,
          });

          setTheoryId('');
          setSearchImage('');
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
