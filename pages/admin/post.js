import React, { useState, useEffect } from 'react';
import Editor from '../../components/admin/Editor';
import Navbar from '../../components/Navbar';
import Head from 'next/head';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from '@material-ui/core';
import firebase from 'firebase/app';
import { useUser } from '../../context/userContext';

const post = () => {
  const [text, setText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [checked, setChecked] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [posts, setPosts] = useState([]);
  const { loadingUser, user, login, logout, isAdmin } = useUser();

  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .limit(10)
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            text: doc.data().text,
            faqQuestion: doc.data().faqQuestion,
            isPublished: doc.data().isPublished,
          }))
        );
      });
  }, []);

  const savePost = () => {
    if (checked) {
      firebase
        .firestore()
        .collection('posts')
        .add({
          title: postTitle,
          text,
          faqQuestion,
          faqAnswer,
          isPublished: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setText('');
          postTitle('');
          checked(false);
          faqQuestion('');
          faqAnswer('');
        });
    } else {
      firebase
        .firestore()
        .collection('posts')
        .add({
          title: postTitle,
          text,
          isPublished: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setText('');
          postTitle('');
          checked(false);
          faqQuestion('');
          faqAnswer('');
        });
    }
  };

  const publishPost = () => {
    if (checked) {
      firebase
        .firestore()
        .collection('posts')
        .add({
          title: postTitle,
          text,
          faqQuestion,
          faqAnswer,
          isPublished: true,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setText('');
          postTitle('');
          checked(false);
          faqQuestion('');
          faqAnswer('');
        });
    } else {
      firebase
        .firestore()
        .collection('posts')
        .add({
          title: postTitle,
          text,
          isPublished: true,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setText('');
          postTitle('');
          checked(false);
          faqQuestion('');
          faqAnswer('');
        });
    }
  };

  const getPosts = () => {
    firebase
      .firestore()
      .collection('posts')
      .limit(10)
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            text: doc.data().text,
            faqQuestion: doc.data().faqQuestion,
            isPublished: doc.data().isPublished,
          }))
        );
      });
  };

  if (isAdmin) {
    return (
      <>
        <Head>
          <title>Admin Area - Post</title>
        </Head>
        <Navbar isAdminNav={true} />
        <div className='container-full'>
          <br />
          <h1>Post</h1>

          <TextField
            id='outlined-basic'
            label='Titolo del post'
            variant='outlined'
            required
            style={{ minWidth: '500px' }}
            onChange={(e) => {
              setPostTitle(e.target.value);
            }}
            value={postTitle}
          />
          <br />
          <br />
          <Editor text={text} setText={(content) => setText(content)} />
          <br />
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  name='È una FAQ?'
                  inputProps={{ 'aria-label': 'È una FAQ?' }}
                  style={{
                    color: '#00408b',
                  }}
                />
              }
              label='È una FAQ?'
            />
            <br />
            {checked && (
              <>
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
                <TextField
                  id='outlined-basic'
                  label='Inserisci una breve risposta'
                  variant='outlined'
                  style={{ minWidth: '500px' }}
                  onChange={(e) => {
                    setFaqAnswer(e.target.value);
                  }}
                  value={faqAnswer}
                />
              </>
            )}
          </div>
          <br />
          <br />
          <Button
            variant='contained'
            style={{
              background: '#06690d',
              color: 'white',
              marginRight: '20px',
            }}
            onClick={savePost}
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
            onClick={publishPost}
          >
            PUbblica
          </Button>

          <br />
          <br />
          <br />

          <h2>Lista Post</h2>
          {posts.map((post) => {
            const { id, title, isPublished, text, faqQuestion } = post;
            return (
              <div key={id}>
                <h3>{title}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: text.slice(0, 150),
                  }}
                ></p>
                {isPublished && (
                  <p style={{ color: '#00408b' }}>
                    <strong>Pubblicato</strong>
                  </p>
                )}
                {!isPublished && (
                  <p style={{ color: '#06690d' }}>
                    <strong>Salvato</strong>
                  </p>
                )}
              </div>
            );
          })}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </>
    );
  } else {
    return <div>Non sei una admin non rompere le balle</div>;
  }
};

export default post;