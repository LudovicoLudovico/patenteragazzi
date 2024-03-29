import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../firebase/clientApp';

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((idTokenResult) => {
            // Check if he is an admin
            if (idTokenResult.claims.admin) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
            const { user_id, picture, name, email } = idTokenResult.claims;
            setUser({
              user_id,
              picture,
              name,
              email,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  const login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        setLoadingUser(false);
        setUser(result.user);
      })
      .catch(function (error) {
        setUser(null);
        setLoadingUser(false);
      });

    return user;
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
        setLoadingUser(false);
        localStorage.removeItem('stats');
      })
      .catch(function (error) {
        setUser(null);
      });
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loadingUser, login, logout, isAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
