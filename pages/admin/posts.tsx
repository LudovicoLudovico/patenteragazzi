import React, { useState, useEffect } from 'react';
import Navbar from '../../components/general/Navbar';
import Head from 'next/head';
import Image from 'next/image';
import { TextField, Button } from '@material-ui/core';
import firebase from 'firebase/app';
import { useUser } from '../../context/userContext';
import { makeStyles } from '@material-ui/core/styles';
import slugify from 'slugify';
import dynamic from 'next/dynamic';
import cheerio from 'cheerio';

const Editor = dynamic(() => import('../../components/admin/Editor'));
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
  const [postId, setPostId] = useState(null);
  const [checked, setChecked] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postImage, setPostImage] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [postDescription, setPostDescription] = useState('');
  const { loadingUser, user, login, logout, isAdmin } = useUser();

  const classes = useStyles();

  let $;

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
            slug: doc.data().slug,
            description: doc.data().description,
            isPublished: doc.data().isPublished,
          }))
        );
      });
  }, []);

  const reset = () => {
    setText('');
    setPostTitle('');
    setChecked(false);
    setPostDescription('');
  };

  const savePost = () => {
    $ = cheerio.load(text);
    $('h3').each(function () {
      $(this).attr(
        'id',
        slugify($(this).text(), {
          lower: true,
          remove: /[*+~()#'"!:@]/g,
        })
      );
    });
    $('h2').each(function () {
      $(this).attr(
        'id',
        slugify($(this).text(), {
          lower: true,
          remove: /[*+~()#'"!:@]/g,
        })
      );
    });

    let titles = [];

    $('h2, h3').each(function () {
      const title = {
        text: $(this).text(),
        type: $(this).get(0).name,
      };

      titles.push(title);
    });

    if (postId) {
      firebase
        .firestore()
        .collection('posts')
        .doc(postId)
        .update({
          title: postTitle,
          text: $.html(),
          isPublished: isPublished,
          slug: slugify(postTitle, { lower: true }),
          description: postDescription,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          titles,
        })
        .then(() => {
          reset();
        });
    } else {
      firebase
        .firestore()
        .collection('posts')
        .add({
          title: postTitle,
          text: $.html(),
          isPublished: isPublished,
          slug: slugify(postTitle, { lower: true }),
          description: postDescription,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          titles,
        })
        .then(() => {
          reset();
        });
    }
  };

  const publishPost = () => {
    $ = cheerio.load(text);
    $('h3').each(function () {
      $(this).attr(
        'id',
        slugify($(this).text(), {
          lower: true,
          remove: /[*+~()#'"!:@]/g,
        })
      );
    });
    $('h2').each(function () {
      $(this).attr(
        'id',
        slugify($(this).text(), {
          lower: true,
          remove: /[*+~()#'"!:@]/g,
        })
      );
    });

    let titles = [];

    $('h2, h3').each(function () {
      const title = { text: $(this).text(), type: $(this).get(0).name };

      titles.push(title);
    });
    if (postId) {
      firebase
        .firestore()
        .collection('posts')
        .doc(postId)
        .update({
          title: postTitle,
          text: $.html(),
          slug: slugify(postTitle, { lower: true }),
          isPublished: true,
          description: postDescription,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          titles,
        })
        .then(() => {
          reset();
        });

      firebase
        .firestore()
        .collection('posts')
        .doc('list')
        .update({
          postSlugs: firebase.firestore.FieldValue.arrayUnion(
            slugify(postTitle, { lower: true })
          ),
        });
    } else {
      firebase
        .firestore()
        .collection('posts')
        .add({
          title: postTitle,
          text: $.html(),
          slug: slugify(postTitle, { lower: true }),
          isPublished: true,
          description: postDescription,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          titles,
        })
        .then(() => {
          reset();
        });

      firebase
        .firestore()
        .collection('posts')
        .doc('list')
        .update({
          postSlugs: firebase.firestore.FieldValue.arrayUnion(
            slugify(postTitle, { lower: true })
          ),
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
            isPublished: doc.data().isPublished,
            slug: doc.data().slug,
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

          <p>Slug: {slugify(postTitle, { lower: true })}</p>
          <br />

          <Editor text={text} setText={setText} />

          <br />
          <TextField
            id='outlined-basic'
            label='Descrizione del post (150 caratteri)'
            variant='outlined'
            required
            style={{ minWidth: '500px' }}
            onChange={(e) => {
              setPostDescription(e.target.value);
            }}
            value={postDescription}
          />

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
            const { id, title, isPublished, text, description } = post;
            return (
              <div key={id}>
                <hr />
                <h3>{title}</h3>
                <p>{description}</p>

                <br />
                <Button
                  variant='contained'
                  style={{
                    background: '#de9000',
                    color: 'white',
                    marginRight: '20px',
                  }}
                  onClick={() => {
                    setText(text);
                    setPostTitle(title);
                    setPostId(id);
                    setIsPublished(isPublished);
                    setPostDescription(description);
                  }}
                >
                  Modifica
                </Button>

                {isPublished && (
                  <p style={{ color: '#00408b' }}>
                    Stato: <strong>Pubblicato</strong>
                  </p>
                )}
                {!isPublished && (
                  <p style={{ color: '#06690d' }}>
                    Stato: <strong>salvato</strong>
                  </p>
                )}
                <hr />
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
