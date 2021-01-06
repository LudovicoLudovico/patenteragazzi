import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import CategoryList from '../CategoryList';
import firebase from 'firebase/app';
import MDEditor from '@uiw/react-md-editor';
import slugify from 'slugify';

const ProblemItem = ({ theoryId, id, image, title, theory, category }) => {
  const [newImage, setNewImage] = useState(image);
  const [newCategory, setNewCategory] = useState(category);
  const [newTitle, setNewTitle] = useState(title);
  const [newTheory, setNewTheory] = useState(theory);

  const saveProblem = () => {
    firebase
      .firestore()
      .collection('theory')
      .doc(theoryId)
      .set({
        image: newImage,
        title: newTitle,
        category: newCategory,
        theory: newTheory,
        slug: slugify(newTitle),
      })
      .then(() => {
        firebase.firestore().collection('problems').doc(id).delete();
      });
  };

  return (
    <div className='problems_item' key={id}>
      <img src={image} alt='Nessun immagine' />
      <br />
      <br />
      <TextField
        id='outlined-multiline-flexible'
        label='Immagine'
        multiline
        rowsMax={10}
        onChange={(e) => setNewImage(e.target.value)}
        value={newImage}
        variant='outlined'
        style={{
          minWidth: 800,
        }}
      />
      <br />
      <br />
      <p>TITOLO: </p>
      <TextField
        id='outlined-multiline-flexible'
        label='Titolo'
        multiline
        rowsMax={10}
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        variant='outlined'
        style={{
          minWidth: 800,
        }}
      />
      <br />
      <p>TEORIA: </p>
      <MDEditor value={theory} onChange={setNewTheory} height={500} />

      <p>CATEGORIA: </p>
      <CategoryList category={newCategory} setCategory={setNewCategory} />
      <br />
      <br />
      <Button
        variant='contained'
        onClick={saveProblem}
        style={{
          background: 'green',
          color: 'white',
        }}
      >
        Salva e risolvi problema
      </Button>
    </div>
  );
};

export default ProblemItem;
