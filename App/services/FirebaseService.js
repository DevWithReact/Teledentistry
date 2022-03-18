import firestore from '@react-native-firebase/firestore';


export function getUserProfile(id) {
  return firestore()
    .collection('users')
    .doc(id)
    .get()
    .then(documentSnapshot  => {  
      if (documentSnapshot.exists) {
        const user = documentSnapshot.data();
        return user;
      }
      return null;
    });
}

