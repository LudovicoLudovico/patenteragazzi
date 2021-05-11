import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import firebase from 'firebase/app';
import Navbar from '../../components/general/Navbar';
import { TextField, Modal, Button, Backdrop, Fade } from '@material-ui/core';
import { useUser } from '../../context/userContext';
import CategoryList from '../../components/admin/CategoryList';
import { makeStyles } from '@material-ui/core/styles';
import { useAdmin } from '../../context/adminContext';
import UpdateTheory from '../../components/admin/UpdateTheory';
import MDEditor from '@uiw/react-md-editor';

import '../../style/admin.min.css';
interface Image {
  imageUrl: string;
  name: string;
}
const theory = () => {
  const [theoryModal, setTheoryModal] = useState(false);
  const [theoryImage, setTheoryImage] = useState('');
  const [theory, setTheory] = useState('');
  const [theoryTitle, setTheoryTitle] = useState('');
  const [category, setCategory] = useState('Segnali di pericolo');

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

  const handleTheoryUpload = (e) => {
    e.preventDefault();

    if (theoryTitle !== '' && theory !== '') {
      firebase.firestore().collection('theory').add({
        image: theoryImage,
        category: category,
        title: theoryTitle,
        theory: theory,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setTheoryImage('');
      setCategory('Segnali di pericolo');
      setTheoryTitle('');
      setTheory('');
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const closeModal = (event) => {
    if (!event.target.innerHTML) {
      setTheoryImage(event.target.src);
      setTheoryModal(false);
    }
  };

  if (isAdmin) {
    return (
      <div>
        <Head>
          <title>Admin Area - Teoria</title>
        </Head>
        <Navbar isAdminNav={true} active={'theory'} />
        <div className='container main_content'>
          <br />
          <h2>Carica teoria</h2>
          <form className='admin-theory'>
            <Button
              variant='contained'
              onClick={() => setTheoryModal(true)}
              style={{
                background: '#2e88f2',
                color: 'white',
              }}
            >
              Seleziona immagine
            </Button>
            <br />
            {theoryImage &&
              images.map((image) => {
                if (image.imageUrl === theoryImage) {
                  return (
                    <img
                      src={theoryImage}
                      alt=''
                      key={image.imageUrl}
                      style={{
                        height: '100px',
                        width: 'auto',
                        marginTop: '20px',
                      }}
                    />
                  );
                } else {
                  return <div></div>;
                }
              })}
            {/* <Modal
              aria-labelledby='transition-modal-title'
              aria-describedby='transition-modal-description'
              open={theoryModal}
              onClose={() => setTheoryModal(false)}
              className={classes.modal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={theoryModal}>
                <div className='admin-modal' onClick={closeModal}>
                  <PaginatedList
                    list={images}
                    itemsPerPage={10}
                    renderList={(list) => (
                      <>
                        {list.map((image: Image) => {
                          return (
                            <img
                              style={{
                                height: 'auto',
                                width: 100,
                                padding: 20,
                              }}
                              src={image.imageUrl}
                              alt={image.name}
                              key={image.name}
                            />
                          );
                        })}
                      </>
                    )}
                  />
                </div>
              </Fade>
            </Modal> */}
            <br />
            <TextField
              id='outlined-multiline-flexible'
              label='Inserisci titolo teoria'
              multiline
              required
              rowsMax={10}
              onChange={(e) => setTheoryTitle(e.target.value)}
              value={theoryTitle}
              variant='outlined'
            />
            <br />
            <br />

            <MDEditor value={theory} onChange={setTheory} height={500} />
            <br />
            <CategoryList
              category={category}
              setCategory={(cat) => setCategory(cat)}
            />
            <br />
            <br />
            <Button
              variant='contained'
              onClick={handleTheoryUpload}
              style={{
                background: '#00408b',
                color: 'white',
                marginRight: '20px',
              }}
            >
              Carica Teoria
            </Button>
          </form>
          <br />

          <br />
          <UpdateTheory />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  } else {
    return <div>Non sei un admin non rompere le balle</div>;
  }
};

export default theory;
