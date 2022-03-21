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
    })
    .catch(e => {
      console.error("getUserProfile", e)
    });
}

export function addMessageEmoticon(channelId, id, emoticon) {
  return firestore()
    .collection('channels')
    .doc(channelId)
    .collection('chats')
    .doc(id)
    .set({
      emoticon
    }, {
      merge: true
    })
}

export function setUserOnline(id, online) {
  return firestore()
    .collection('users')
    .doc(id)
    .set({
      online: online
    }, {
      merge: true
    });
}
export function setUserTyping(id, userid, typing) {
  return firestore()
    .collection('channels')
    .doc(id)
    .set({
      [`typing_${userid}`]: typing
    }, {
      merge: true
    });
}

export function setReadAll(id, userid, lastMsg) {
  return firestore()
    .collection('channels')
    .doc(id)
    .set({
      [`lastSeen_${userid}`]: lastMsg
    }, {
      merge: true
    });
}