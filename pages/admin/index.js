import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/userContext';
import { useAdmin } from '../../context/adminContext';
import firebase from 'firebase';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

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

  //Handle Image Selection
  const handleImageSelection = (e) => {
    if (e.target.files[0]) {
      setImageToUpload(e.target.files[0]);
    } else {
      setImageToUpload(null);
    }
  };

  //Handle Image Upload
  const handleImageUpload = (e) => {
    // If there is not image to Upload do nothing
    if (!imageToUpload) {
      return;
    }

    e.preventDefault();

    //Create a reference in the storage and save the downloadURl to db
    firebase
      .storage()
      .ref(`images/${imageToUpload.name}`)
      .put(imageToUpload)
      .then(() => {
        firebase
          .storage()
          .ref('images')
          .child(imageToUpload.name)
          .getDownloadURL()
          .then((url) => {
            firebase.firestore().collection('images').add({
              imageUrl: url,
              name: imageToUpload.name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            //State reset
            setImageToUpload(null);
          });
      });
  };
  // const numQuestions = () => {
  //   let i = 0;
  //   firebase
  //     .firestore()
  //     .collection('questions')
  //     .get()
  //     .then(function (querySnapshot) {
  //       querySnapshot.forEach(function (doc) {
  //         console.log('ran');
  //         firebase.firestore().collection('questions').doc(doc.id).update({
  //           num: i,
  //         });
  //         i++;
  //       });
  //     });
  // };

  //On page load get all images
  useEffect(() => {
    if (!images) {
      getImages();
    }
  }, []);

  if (isAdmin) {
    return (
      <>
        <NextSeo nofollow={true} />
        <Head>
          <title>Admin Area</title>
          <link rel='shortcut icon' href='/patenteragazzi.ico' />
        </Head>
        {/* Navbar */}
        <Navbar isAdminNav={true} />
        <div className='admin-ui container'>
          {/* Image Upload */}
          <h2>Carica immagine</h2>
          <form className='admin-image-upload'>
            <label htmlFor='upload-image'>
              Clicca per scegliere l'immagine da caricare
            </label>
            <br />
            <br />
            <input
              type='file'
              id='upload-image'
              onChange={handleImageSelection}
              accept='.png, .jpeg, .jpg'
            />
            <br />
            <br />
            <Button variant='contained' onClick={handleImageUpload}>
              Carica Immagine
            </Button>
          </form>

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
                  <div className='image_item'>
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
