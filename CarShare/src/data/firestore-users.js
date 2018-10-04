import firebase from 'react-native-firebase';

export const getUser = (uid, listing) => {
    var firestoreUser = firebase.firestore().doc('users/' + uid);

    firestoreUser.onSnapshot((userDocument) => {
        listing(userDocument.data())
    });
}

export const setUser = (response, firstName, lastName, contactNum) => {
    const firestoreUsers = firebase.firestore().collection('users');

    firestoreUsers.doc(response.user.uid).set({
        firstName: firstName,
        lastName: lastName,
        contactNum: contactNum
    })
}

export const updateUser = (uid, firstName, lastName, contactNum, success) => {
    const firestoreUser = firebase.firestore().doc('users/' + uid);

    firestoreUser.update({
        firstName: firstName,
        lastName: lastName,
        contactNum: contactNum
    })
        .then((response) => success(true))
        .catch((error) => success(false));
}