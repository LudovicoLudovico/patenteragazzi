import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../firebase/clientApp';

export const AdminContext = createContext();

export default function AdminContextComp({ children }) {
  const [searchQuestionQuery, setSearchQuestionQuery] = useState('');
  const [searchQuestionResult, setSeatchQuestionResult] = useState([]);
  const [searchQuestionToModify, setSearchQuestionToModify] = useState(null);
  const [modifiedQuestion, setModifiedQuestion] = useState(null);

  const questionQuery = () => {};

  return (
    <AdminContext.Provider
      value={{
        searchQuestionQuery,
        searchQuestionResult,
        searchQuestionToModify,
        modifiedQuestion,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useAdmin = () => useContext(AdminContext);
