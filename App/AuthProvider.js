import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth().onAuthStateChanged(
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        if (authenticatedUser) {
          firestore()
            .collection('users')
            .doc(authenticatedUser.uid)
            .get()
            .then(documentSnapshot => {
              console.log('User exists: ', documentSnapshot.exists);
              if (documentSnapshot.exists) {
                console.log('User Profile', documentSnapshot.data());
                setUserProfile(documentSnapshot.data());
              }
            });
        }
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        login: async (email, password) => {
          if (email !== '' && password !== '') {
            setLoading(true);
            try {
              await auth().signInWithEmailAndPassword(email, password)
                .then(() => console.log('Login success'))
                .catch(err => console.log(`Login err: ${err}`));
            } catch (e) {
              console.error(e);
            }
            setLoading(false);
           }
        },
        register: async (displayName, email, password) => {
          setLoading(true);
          try {
            await auth().createUserWithEmailAndPassword(email, password)
              .then((credential) => {
                credential.user
                  .updateProfile({ displayName: displayName })
              })
          } catch (e) {
            console.error(e);
          }
          setLoading(false);
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}