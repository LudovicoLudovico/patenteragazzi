import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../firebase/clientApp';

export const AdminContext = createContext();

export default function AdminContextComp({ children }) {
  const [searchQuestionQuery, setSearchQuestionQuery] = useState(null);
  const [searchQuestionResult, setSearchQuestionResult] = useState([]);
  const [searchQuestionToModify, setSearchQuestionToModify] = useState(null);
  const [modifiedQuestion, setModifiedQuestion] = useState(null);

  const [images, setImages] = useState([]);
  const [imageQuantity, setImageQuantity] = useState(50);
  const [questionsList, setQuestionsList] = useState([]);
  const [theoryList, setTheoryList] = useState([]);
  const [posts, setPosts] = useState([]);

  const queryQuestions = () => {
    if (searchQuestionQuery) {
      firebase
        .firestore()
        .collection('questions')
        .where('title', '==', searchQuestionQuery.title)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());

            setSearchQuestionResult((searchQuestionResult) => [
              ...searchQuestionResult,
              { id: doc.id, data: doc.data() },
            ]);
          });
        });
    }
  };

  const getImages = () => {
    if (!images || images.length === 0) {
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
    }
  };

  const getQuestionsList = () => {
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
  };

  const getTheoryList = () => {
    if (!theoryList || theoryList.length === 0) {
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
    }
  };
  return (
    <AdminContext.Provider
      value={{
        searchQuestionQuery,
        searchQuestionResult,
        searchQuestionToModify,
        modifiedQuestion,
        setSearchQuestionQuery,
        setSearchQuestionResult,
        queryQuestions,
        getImages,
        images,
        getQuestionsList,
        questionsList,
        getTheoryList,
        theoryList,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useAdmin = () => useContext(AdminContext);
