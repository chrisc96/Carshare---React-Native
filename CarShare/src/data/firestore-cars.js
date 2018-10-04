import firebase from 'react-native-firebase';

export const getCars = (uid, car) => {
    const firestoreCars = firebase.firestore().collection('cars').where('userID', '==', uid);

    firestoreCars.onSnapshot((snapshot) => {
        const carsFromDB = [];
        snapshot.forEach((firestoreDocument) => {
          const { make, model, rego, userID, year } = firestoreDocument.data();
    
          carsFromDB.push({
            key: firestoreDocument.id,
            firestoreDocument,
            make,
            model,
            rego,
            userID,
            year
          });
        })
    
        car(carsFromDB);
      })
}

export const addCar = (make, model, rego, uid, year, success) => {
    const firestoreCars = firebase.firestore().collection('cars');
    
    firestoreCars.add({
        make: make,
        model: model,
        rego: rego,
        userID: uid,
        year: year
    })
        .then((response) => success(true))
        .catch((error) => success(false));
}