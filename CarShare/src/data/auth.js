import firebase from 'react-native-firebase';

export const signUp = (email, password) =>
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);

export const login = (email, password) =>
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);

export const logOut = () =>
    firebase.auth().signOut()

export const checkLoggedIn = (currentUser) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser(user)
          } else {
            currentUser(null)
          } 
    });
}