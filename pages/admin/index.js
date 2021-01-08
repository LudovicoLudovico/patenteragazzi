import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/userContext';
import { useAdmin } from '../../context/adminContext';
import firebase from 'firebase/app';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Image from 'next/image';
import slugify from 'slugify';
import { unslugify } from 'unslugify';

//Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

//Components
import Navbar from '../../components/Navbar';

const AdminUI = () => {
  const { isAdmin } = useUser();
  const { getImages, images } = useAdmin();

  //State
  const [imageToUpload, setImageToUpload] = useState(null);
  const [filterImage, setFilterImage] = useState('');
  const [imageLoader, setImageLoader] = useState(false);
  const [imageToChange, setImageToChange] = useState('');
  const [newImage, setNewImage] = useState('');
  const [isLoadingChange, setIsLoadingChange] = useState(false);

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

    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

  const classes = useStyles();

  //Handle Image Selection
  const handleImageSelection = (e) => {
    if (e.target.files[0]) {
      setImageToUpload(e.target.files[0]);
    } else {
      setImageToUpload(null);
    }
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
            setImageLoader(false);
          });
      });
  };

  //On page load get all images
  useEffect(() => {
    getImages();
  }, []);

  const changeImage = () => {
    setIsLoadingChange(true);
    console.log(imageToChange);
    console.log(newImage);

    if (imageToChange !== '' && newImage !== '') {
      firebase
        .firestore()
        .collection('questions')
        .where('image', '==', imageToChange)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
            firebase.firestore().collection('questions').doc(doc.id).update({
              image: newImage,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setImageToChange('');
            setNewImage('');
            setIsLoadingChange(false);
          });
        });
    }
  };

  if (isAdmin) {
    return (
      <>
        <NextSeo nofollow={true} />
        <Head>
          <title>Admin Area</title>
          <link rel='shortcut icon' href='/patenteragazzi.ico' />
        </Head>
        {/* Navbar */}
        <Navbar isAdminNav={true} active={'immagini'} />
        <div className='admin-ui container-full main_content'>
          {/* Image Change */}
          <h2>Sostituisci immagine</h2>
          <TextField
            id='outlined-basic'
            label='Scrivi il link del immagine da sostituire'
            variant='outlined'
            style={{ minWidth: '500px' }}
            onChange={(e) => setImageToChange(e.target.value)}
            value={imageToChange}
          />
          <img src={imageToChange} alt='' />
          <br />
          <br />
          <TextField
            id='outlined-basic'
            label='Scrivi il link del immagine nuova'
            variant='outlined'
            style={{ minWidth: '500px' }}
            onChange={(e) => setNewImage(e.target.value)}
            value={newImage}
          />
          <img src={newImage} alt='' />
          <br />
          <br />
          <Button
            variant='contained'
            component='span'
            onClick={changeImage}
            style={{ backgroundColor: '#2e88f2', color: 'white' }}
          >
            {!isLoadingChange ? 'Sostituisci immagine' : 'Caricamento...'}
          </Button>

          {/* Image Upload */}
          <h2>Carica immagine</h2>
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
              Carica immagine
            </Button>
          </label>
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

          <h2>Cerca immagine</h2>
          <TextField
            id='outlined-basic'
            label='Scrivi per filtrare le immagini'
            variant='outlined'
            style={{ minWidth: '500px' }}
            onChange={(e) => setFilterImage(e.target.value)}
            value={filterImage}
          />
          <br />
          <br />
          <div className='image_item_container'>
            {images &&
              images
                .filter((image) => image.name.includes(filterImage))
                .map((image) => (
                  <div className='image_item' key={image.imageUrl}>
                    <h2>{image.name}</h2>
                    <img src={image.imageUrl} alt='' />
                    <p>{image.imageUrl}</p>
                  </div>
                ))}
          </div>
        </div>
      </>
    );
  } else {
    return <div>Non sei un admin non rompere le balle</div>;
  }
};

export default AdminUI;
