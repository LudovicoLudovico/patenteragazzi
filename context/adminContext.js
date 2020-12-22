import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../firebase/clientApp';

export const AdminContext = createContext();

export default function AdminContextComp({ children }) {
  const [searchQuestionQuery, setSearchQuestionQuery] = useState(null);
  const [searchQuestionResult, setSearchQuestionResult] = useState([]);
  const [searchQuestionToModify, setSearchQuestionToModify] = useState(null);
  const [modifiedQuestion, setModifiedQuestion] = useState(null);

  const [images, setImages] = useState(null);
  const [imageQuantity, setImageQuantity] = useState(50);
  const [theory, setTheory] = useState([]);
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
    firebase
      .firestore()
      .collection('images')
      .orderBy('timestamp', 'desc')
      .limit(imageQuantity)
      .onSnapshot((snapshot) => {
        setImages(
          snapshot.docs.map((doc) => ({
            id: doc.data().id,
            name: doc.data().name,
            imageUrl: doc.data().imageUrl,
          }))
        );
      });
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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useAdmin = () => useContext(AdminContext);
