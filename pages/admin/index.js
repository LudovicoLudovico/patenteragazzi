import React, { useState, useEffect } from 'react';
import { PaginatedList } from 'react-paginated-list';
import { useUser } from '../../context/userContext';
import firebase from 'firebase';
import MDEditor from '@uiw/react-md-editor';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

//Material-UI
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

//Components
import Navbar from '../../components/Navbar';
import QuestionsList from '../../components/QuestionsList';
import CategoryList from '../../components/CategoryList';
import UpdateTheory from '../../components/admin/UpdateTheory';

const AdminUI = () => {
  const { loadingUser, user, login, logout, isAdmin } = useUser();

  //State
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const [theoryModal, setTheoryModal] = useState(false);
  const [images, setImages] = useState(null);
  const [response, setResponse] = useState(true);
  const [question, setQuestion] = useState('');
  const [questionsList, setQuestionsList] = useState(null);
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('Segnali di pericolo');
  const [theory, setTheory] = useState('');
  const [theoryTitle, setTheoryTitle] = useState('');
  const [theoryImage, setTheoryImage] = useState('');
  const [theoryList, setTheoryList] = useState([]);
  const [filterImage, setFilterImage] = useState('');
  const [theoryToUpdate, setTheoryToUpdate] = useState('');
  const [theoryUpdate, setTheoryUpdate] = useState('');

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
  const numQuestions = () => {
    let i = 0;
    firebase
      .firestore()
      .collection('questions')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log('ran');
          firebase.firestore().collection('questions').doc(doc.id).update({
            num: i,
          });
          i++;
        });
      });
  };

  //On page load get all images and all questions
  useEffect(() => {
    //Get all images and sort them from the latest to the oldest

    firebase
      .firestore()
      .collection('images')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setImages(
          snapshot.docs.map((doc) => ({
            id: doc.data().id,
            name: doc.data().name,
            imageUrl: doc.data().imageUrl,
          }))
        );
      });

    // Get all questions and sort them from the latest to the
    // firebase
    //   .firestore()
    //   .collection('questions')
    //   .orderBy('timestamp', 'desc')
    //   .limit(100)
    //   .onSnapshot((snapshot) => {
    //     setQuestionsList(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         image: doc.data().image,
    //         answer: doc.data().answer,
    //         question: doc.data().question,
    //         category: doc.data().category,
    //         response: doc.data().response,
    //       }))
    //     );
    //   });

    // firebase
    //   .firestore()
    //   .collection('theory')
    //   .orderBy('timestamp', 'desc')
    //   .onSnapshot((snapshot) => {
    //     setTheoryList(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         image: doc.data().image,
    //         theory: doc.data().theory,
    //         title: doc.data().title,
    //         category: doc.data().category,
    //       }))
    //     );
    //   });
  }, []);

  //Upload question to Questions collection in the db
  // const uploadQuestion = (e) => {
  //   e.preventDefault();

  //   firebase.firestore().collection('questions').add({
  //     image: imageSelected,
  //     question: question,
  //     response: response,
  //     answer: answer,
  //     category: category,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  // };

  // const handleTheoryUpload = (e) => {
  //   e.preventDefault();

  //   if (theoryTitle !== '' && theory !== '') {
  //     firebase.firestore().collection('theory').add({
  //       image: theoryImage,
  //       category: category,
  //       title: theoryTitle,
  //       theory: theory,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     });

  //     setTheoryImage('');
  //     setCategory('Segnali di pericolo');
  //     setTheoryTitle('');
  //     setTheory('');
  //   }
  //};

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
            <br />
            <label htmlFor='upload-image'>
              Clicca per scegliere l'immagine da caricare
            </label>
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
          <input
            type='text'
            value={filterImage}
            placeholder='Scrivi per filtrare le immagini'
            onChange={(e) => setFilterImage(e.target.value)}
          />
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
