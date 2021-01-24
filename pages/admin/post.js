import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Navbar from '../../components/Navbar';
import Head from 'next/head';
import Image from 'next/image';
import { TextField, Button } from '@material-ui/core';

import firebase from 'firebase/app';
import { useUser } from '../../context/userContext';
import { makeStyles } from '@material-ui/core/styles';

import '../../style/admin.min.css';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const post = () => {
  const [text, setText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [checked, setChecked] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [posts, setPosts] = useState([]);
  const [postImage, setPostImage] = useState('');
  const [imageLoader, setImageLoader] = useState(false);
  const { loadingUser, user, login, logout, isAdmin } = useUser();

  const classes = useStyles();

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
          image: postImage,
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
            image: postImage,
          }))
        );
      });
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setImageLoader(true);
    firebase
      .storage()
      .ref(`images/${image.name}`)
      .put(image)
      .then(() => {
        firebase
          .storage()
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            firebase.firestore().collection('images').add({
              imageUrl: url,
              name: image.name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setPostImage(url);
            setImageLoader(false);
          });
      });
  };
  if (isAdmin) {
    return (
      <>
        <Head>
          <title>Admin Area - Post</title>
        </Head>
        <Navbar isAdminNav={true} active={'post'} />
        <div className='container-full main_content'>
          <br />
          <h1>Post</h1>

          {!postImage && (
            <div
              style={{
                marginBottom: 0,
                display: 'flex',
                height: 60,
                alignItems: 'center',
              }}
            >
              <input
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                type='file'
                onChange={(e) => handleImageUpload(e)}
              />
              <label htmlFor='contained-button-file'>
                <Button
                  variant='contained'
                  component='span'
                  style={{ backgroundColor: '#2e88f2', color: 'white' }}
                >
                  Carica immagine cover
                </Button>
              </label>
              <p style={{ margin: 20 }}>Oppure caricala attraverso link</p>
              <TextField
                id='outlined-basic'
                label="Inserisci il link all'immagine"
                variant='outlined'
                style={{
                  minWidth: '500px',

                  marginTop: 0,
                }}
                onChange={(e) => {
                  setPostImage(e.target.value);
                }}
                value={postImage}
              />
            </div>
          )}

          {postImage && !imageLoader && (
            <>
              <img
                src={postImage}
                alt=''
                style={{
                  height: 100,
                  width: 'auto',
                  marginTop: 0,
                  marginBottom: 20,
                }}
              />
            </>
          )}

          {imageLoader && (
            <>
              <br />
              <div
                className='loading'
                style={{
                  height: 250,
                  width: 250,
                }}
              >
                <Image
                  src='/car.svg'
                  alt='Caricamento'
                  layout={'intrinsic'}
                  width={150}
                  height={150}
                />
                <p>Caricamento...</p>
              </div>
            </>
          )}

          <br />

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

          <MDEditor value={text} onChange={setText} height={500} />
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
