import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Modal,
  Backdrop,
  Fade,
} from '@material-ui/core';
import CategoryList from '../../components/CategoryList';
import QuestionsList from '../../components/QuestionsList';

import { PaginatedList } from 'react-paginated-list';
import firebase from 'firebase/app';
import { useAdmin } from '../../context/adminContext';
import { useUser } from '../../context/userContext';

//Components
import Navbar from '../../components/Navbar';

export default function questions() {
  const [searchQuestionTitle, setSearchQuestionTitle] = useState('');
  const [searchQuestionsCategory, setSearchQuestionsCategory] = useState('');
  const [resultQuestions, setResultQuestions] = useState([]);
  const [imageSelected, setImageSelected] = useState(null);
  const [modal, setModal] = useState(false);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionsList, setQuestionsList] = useState([]);
  const [theoryList, setTheoryList] = useState([]);
  const [response, setResponse] = useState(true);
  const [category, setCategory] = useState('Segnali di pericolo');
  const [counter, setCounter] = useState(0);

  const { isAdmin } = useUser();
  const { images, getImages } = useAdmin();

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    firebase
      .firestore()
      .collection('theory')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .onSnapshot((snapshot) => {
        setTheoryList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().image,
            theory: doc.data().theory,
            title: doc.data().title,
            category: doc.data().category,
          }))
        );
      });

    if (!images) {
      getImages();
    }

    firebase
      .firestore()
      .collection('questions')
      .doc('counter')
      .onSnapshot(function (doc) {
        setCounter(doc.data().counter);
      });
  }, []);

  const searchQuestions = () => {
    setResultQuestions([]);
    firebase
      .firestore()
      .collection('questions')
      .where('question', '==', searchQuestionTitle)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc);
          setResultQuestions((resultQuestions) => [
            ...resultQuestions,
            {
              id: doc.id,
              question: doc.data().question,
              response: doc.data().response,
              image: doc.data().image,
            },
          ]);
        });
      });
  };

  const uploadQuestion = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection('questions')
      .add({
        image: imageSelected,
        question: question,
        response: response,
        answer: answer,
        category: category,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        firebase
          .firestore()
          .collection('questions')
          .doc('counter')
          .update({
            counter: firebase.firestore.FieldValue.increment(1),
          });
        setQuestion('');
      });
  };
  if (isAdmin) {
    return (
      <>
        <Head>
          <title>Admin Area - Domande</title>
        </Head>
        <div className='container-full'>
          <Navbar isAdminNav={true} />
          <br />

          <h2>Numero domande: {counter}</h2>
          <h2>Carica domanda</h2>
          <form className='admin-question-upload'>
            <div>
              <Button
                variant='contained'
                onClick={() => setModal(true)}
                style={{
                  background: '#2e88f2',
                  color: 'white',
                }}
              >
                Seleziona immagine
              </Button>
              <br />
              <br />
              {imageSelected &&
                images.map((image) => {
                  if (image.imageUrl === imageSelected) {
                    return (
                      <>
                        <img src={imageSelected} alt='' key={image.imageUrl} />{' '}
                        <br />
                        <br />
                      </>
                    );
                  } else {
                    return <div></div>;
                  }
                })}
              <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                open={modal}
                onClose={() => setModal(false)}
                className={classes.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={modal}>
                  <div
                    className='admin-modal'
                    onClick={(e) => {
                      if (!e.target.innerHTML) {
                        setImageSelected(e.target.src);
                        setModal(false);
                      }
                    }}
                  >
                    <PaginatedList
                      id='paginated'
                      list={images}
                      itemsPerPage={10}
                      renderList={(list) => (
                        <>
                          {list.map((image) => {
                            return (
                              <img
                                style={{
                                  height: 'auto',
                                  width: 100,
                                  padding: 20,
                                }}
                                key={image.name}
                                src={image.imageUrl}
                                alt={image.name}
                              />
                            );
                          })}
                        </>
                      )}
                    />
                  </div>
                </Fade>
              </Modal>
            </div>

            <TextField
              id='outlined-multiline-flexible'
              label='Inserisci la domanda
          '
              style={{ marginLeft: '0' }}
              multiline
              rowsMax={10}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              variant='outlined'
            />

            <br />

            {/* Select theory reference */}
            <FormControl
              className={classes.formControl}
              variant='filled'
              style={{ marginLeft: '0', marginTop: '20px' }}
            >
              <InputLabel htmlFor='age-native-simple'>Teoria</InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                defaultValue=''
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              >
                {theoryList.map((theoryObj) => {
                  return (
                    <MenuItem value={theoryObj.id} key={theoryObj.id}>
                      {theoryObj.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <br />
            <FormControl
              className={classes.formControl}
              variant='filled'
              style={{
                marginLeft: '0',
                marginTop: '10px',
                marginBottom: '20px',
              }}
            >
              <InputLabel htmlFor='age-native-simple'>Risposta</InputLabel>
              <Select
                value={response}
                onChange={(e) =>
                  setResponse(e.target.value === 'true' ? true : false)
                }
                inputProps={{
                  name: 'Risposta',
                  id: 'age-native-simple',
                }}
              >
                <MenuItem value={'true'}>Vero</MenuItem>
                <MenuItem value={'false'}>Falso</MenuItem>
              </Select>
            </FormControl>

            <br />
            <CategoryList
              category={category}
              setCategory={(cat) => setCategory(cat)}
            />
            <br />
            <br />
            <Button
              variant='contained'
              onClick={uploadQuestion}
              style={{
                background: '#06690d',
                color: 'white',
                marginRight: '20px',
              }}
            >
              Carica domanda
            </Button>
          </form>

          <br />

          <h2>Cerca Domanda</h2>
          <TextField
            id='outlined-basic'
            label='Cerca domanda...'
            variant='outlined'
            value={searchQuestionTitle}
            onChange={(e) => setSearchQuestionTitle(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant='contained'
            onClick={searchQuestions}
            style={{
              background: '#2e88f2',
              color: 'white',
            }}
          >
            Cerca
          </Button>

          {resultQuestions.map((result) => {
            return (
              <div key={result.id}>
                <img src={result.image} alt='' />
                <h2>{result.question}</h2> <p>{result.response}</p>
              </div>
            );
          })}

          {resultQuestions.length === 0 && (
            <>
              <br />
              <br />
              <div>La tua ricerca non ha dato risultati</div>
            </>
          )}

          <h2>Domande</h2>

          {questionsList.length === 0 && (
            <Button
              variant='contained'
              onClick={() => {
                firebase
                  .firestore()
                  .collection('questions')
                  .limit(100)
                  .orderBy('timestamp', 'desc')
                  .onSnapshot((snapshot) => {
                    setQuestionsList(
                      snapshot.docs.map((doc) => ({
                        id: doc.id,
                        question: doc.data().question,
                        response: doc.data().response,
                        image: doc.data().image,
                      }))
                    );
                  });
              }}
              style={{
                background: '#2e88f2',
                color: 'white',
              }}
            >
              Carica
            </Button>
          )}

          <QuestionsList questionsList={questionsList} theoryList={[]} />
        </div>
      </>
    );
  } else {
    return <div>Non sei un admin non rompere le balle</div>;
  }
}
