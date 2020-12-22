import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../firebase/clientApp';

export const AdminContext = createContext();

export default function AdminContextComp({ children }) {
  const [searchQuestionQuery, setSearchQuestionQuery] = useState(null);
  const [searchQuestionResult, setSearchQuestionResult] = useState([]);
  const [searchQuestionToModify, setSearchQuestionToModify] = useState(null);
  const [modifiedQuestion, setModifiedQuestion] = useState(null);

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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useAdmin = () => useContext(AdminContext);
