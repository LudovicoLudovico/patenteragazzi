import React, { useState } from 'react';
import Head from 'next/head';
import { TextField, Button } from '@material-ui/core';
import Navbar from '../../components/Navbar';
import firebase from 'firebase/app';
import MDEditor from '@uiw/react-md-editor';
import { useUser } from '../../context/userContext';

import '../../admin.min.css';

const faq = () => {
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const { isAdmin } = useUser();

  const saveFAQ = () => {
    firebase
      .firestore()
      .collection('faq')
      .add({
        question: faqQuestion,
        answer: faqAnswer,
        isPublished: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setFaqAnswer('');
        setFaqQuestion('');
      });
  };

  const publishFAQ = () => {
    firebase
      .firestore()
      .collection('faq')
      .add({
        question: faqQuestion,
        answer: faqAnswer,
        isPublished: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setFaqAnswer('');
        setFaqQuestion('');
      });
  };

  if (isAdmin) {
    return (
      <>
        <Head>
          <title>Admin Area - FAQ</title>
        </Head>
        <Navbar isAdminNav={true} active={'faq'} />
        <br />

        <div className='main_content container-full'>
          <TextField
            id='outlined-basic'
            label='Inserisci la domanda'
            variant='outlined'
            style={{ minWidth: '500px' }}
            onChange={(e) => {
              setFaqQuestion(e.target.value);
            }}
            value={faqQuestion}
          />
          <br />
          <br />
          <br />
          <MDEditor value={faqAnswer} onChange={setFaqAnswer} height={500} />
          <br />

          <br />
          <br />
          <Button
            variant='contained'
            style={{
              background: '#06690d',
              color: 'white',
              marginRight: '20px',
            }}
            onClick={saveFAQ}
          >
            Salva
          </Button>
          <Button
            variant='contained'
            style={{
              background: '#00408b',
              color: 'white',
              marginRight: '20px',
            }}
            onClick={publishFAQ}
          >
            PUbblica
          </Button>
        </div>
      </>
    );
  } else {
    return <div>Non sei una admin, non rompere le balle</div>;
  }
};

export default faq;
