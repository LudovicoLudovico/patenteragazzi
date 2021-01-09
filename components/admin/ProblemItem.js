import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import CategoryList from '../CategoryList';
import firebase from 'firebase/app';

const ProblemItem = ({
  questionId,
  id,
  image,
  question,
  response,
  category,
  answer,
}) => {
  const [newImage, setNewImage] = useState(image);
  const [newQuestion, setNewQuestion] = useState(question);
  const [newResponse, setNewResponse] = useState(response);
  const [newCategory, setNewCategory] = useState(category);
  const [newAnswer, setNewAnswer] = useState(answer);

  console.log(questionId);

  const saveProblem = () => {
    firebase
      .firestore()
      .collection('questions')
      .doc(questionId)
      .update({
        image: newImage,
        question: newQuestion,
        category: newCategory,
        response: newResponse,
        answer: newAnswer,
      })
      .then(() => {
        firebase.firestore().collection('problems').doc(id).delete();
      });
  };

  return (
    <div className='problems_item' key={id}>
      <img src={newImage} alt='Nessun immagine' />
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
      <p>DOMANDA: </p>
      <TextField
        id='outlined-multiline-flexible'
        label='Domanda'
        multiline
        rowsMax={10}
        onChange={(e) => setNewQuestion(e.target.value)}
        value={newQuestion}
        variant='outlined'
        style={{
          minWidth: 800,
        }}
      />

      <p>CATEGORIA: </p>
      <CategoryList category={newCategory} setCategory={setNewCategory} />
      <p>RISPOSTA:</p>

      <Select
        labelId='demo-simple-select-filled-label'
        id='demo-simple-select-filled'
        value={newResponse}
        onChange={(e) =>
          setNewResponse(e.target.value == 'true' ? true : false)
        }
      >
        <MenuItem value='true'>Vero</MenuItem>
        <MenuItem value='false'>Falso</MenuItem>
      </Select>

      <p>ID_TEORIA: {answer}</p>

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
