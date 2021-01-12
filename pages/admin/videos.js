import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar';
import firebase from 'firebase/app';
import { Button } from '@material-ui/core';
const videos = () => {
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
  const [imageLoader, setImageLoader] = useState(false);
  const [video, setVideo] = useState('');
  const handleVideoUpload = (e) => {
    const video = e.target.files[0];
    setImageLoader(true);
    firebase
      .storage()
      .ref(`videos/${video.name}`)
      .put(video)
      .then(() => {
        firebase
          .storage()
          .ref('videos')
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            firebase.firestore().collection('videos').add({
              videoUrl: url,
              name: video.name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setImageLoader(false);
          });
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('videos')
      .get()
      .then((videos) => {
        setVideo(videos.getDownloadURL());
      });
  }, []);
  return (
    <>
      <Head>
        <title>Admin Area</title>
        <link rel='shortcut icon' href='/patenteragazzi.ico' />
      </Head>
      {/* Navbar */}
      <Navbar isAdminNav={true} active={'videos'} />
      <div className='admin-ui container-full main_content'>
        <h2>Carica Video</h2>

        <input
          accept='video/*'
          className={classes.input}
          id='contained-button-file'
          type='file'
          onChange={(e) => handleVideoUpload(e)}
        />
        <label htmlFor='contained-button-file'>
          <Button
            variant='contained'
            component='span'
            style={{ backgroundColor: '#2e88f2', color: 'white' }}
          >
            Carica video
          </Button>
        </label>

        <video width='320' height='240' controls>
          <source src='movie.mp4' type='video/mp4' />
        </video>
      </div>
    </>
  );
};

export default videos;
