import firebase from 'react-native-firebase';

export const getListings = (listings) => {
  const firestoreListings = firebase.firestore().collection('listings');
  
  firestoreListings.onSnapshot((snapshot) => {
    listingsFromDB = []
    snapshot.forEach((firestoreDocument) => {
      const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, carDocumentID, userDocumentID, whoWantsToCome, whosComing } = firestoreDocument.data();

      firebase.firestore().doc('cars/' + carDocumentID).onSnapshot((carDocument) => {
        if (!carDocument.data()) return;
        const { make, model, year } = carDocument.data();

        firebase.firestore().doc('users/' + userDocumentID).onSnapshot((userDocument) => {
          if (!userDocument.data()) return;
          const { firstName, lastName, contactNum } = userDocument.data();

          let listingID = firestoreDocument._ref._documentPath._parts[1]
          
          if (seatsAvailable > 0) {
            listingsFromDB.push({
              key: listingID,
              firestoreDocument,
              listingID,
              departureDate,
              departureTime,
              destination,
              meetingPoint,
              seatsAvailable,
              storageSpace,
              make,
              model,
              year,
              firstName,
              lastName,
              contactNum,
              whoWantsToCome,
              whosComing
            });
          }
          listings(listingsFromDB);
        })
      })
    });
  })
}

export const getUserListings = (uid, listings) => {
  const firestoreListings = firebase.firestore().collection('listings').where('userDocumentID', '==', uid);
  
  firestoreListings.onSnapshot((snapshot) => {
    const listingsFromDB = [];
    snapshot.forEach((firestoreDocument) => {
      const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, carDocumentID, whoWantsToCome, whosComing } = firestoreDocument.data();
    
      firebase.firestore().doc('cars/' + carDocumentID).onSnapshot((carDocument) => {
        if (!carDocument.data()) return;
        const { make, model, year } = carDocument.data();
    
        let listingID = firestoreDocument._ref._documentPath._parts[1]
    
        listingsFromDB.push({
          key: listingID,
          listingID,
          departureDate,
          departureTime,
          destination,
          meetingPoint,
          seatsAvailable,
          storageSpace,
          make,
          model,
          year,
          whoWantsToCome,
          whosComing
        });
    
        listings(listingsFromDB);
      })
    });
  })
}

export const getListing = (key, listing) => {
  firebase.firestore().doc('listings/' + key).onSnapshot((firestoreDocument) => {
  const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, carDocumentID, userDocumentID, whoWantsToCome, whosComing } = firestoreDocument.data();
  
  firebase.firestore().doc('cars/' + carDocumentID).onSnapshot((carDocument) => {
    if (!carDocument.data()) return;
    const { make, model, year } = carDocument.data();

    firebase.firestore().doc('users/' + userDocumentID).onSnapshot((userDocument) => {
      if (!userDocument.data()) return;
      const { firstName, lastName, contactNum } = userDocument.data();

      let listingID = firestoreDocument._ref._documentPath._parts[1]
      listing({listingID, departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, make, model, year, firstName, lastName, contactNum, whoWantsToCome, whosComing, userDocumentID})
      });
    });
  })
}


export const getRidesTaking = (uid, listings) => {
  const firestoreListings = firebase.firestore().collection('listings');
  firestoreListings.onSnapshot((snapshot) => {
    let listingsFromDB = [];
    snapshot.forEach((firestoreDocument) => {
      const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, userDocumentID, carDocumentID, whoWantsToCome, whosComing } = firestoreDocument.data();

      firebase.firestore().doc('cars/' + carDocumentID).onSnapshot((carDocument) => {
        if (!carDocument.data()) return;
        const { make, model, year } = carDocument.data();

        let listingID = firestoreDocument._ref._documentPath._parts[1]

        listingsFromDB.push({
          key: listingID,
          listingID,
          departureDate,
          departureTime,
          destination,
          meetingPoint,
          seatsAvailable,
          storageSpace,
          make,
          model,
          year,
          userDocumentID,
          whoWantsToCome,
          whosComing
        });

        listingsFromDB = listingsFromDB.filter(listing => {
          const userPoster = listing.userDocumentID;
          let iDidntPostThisListing = true;
          let comingOnThisListing = false;

          listing.whosComing.forEach(el => {
            if (userPoster === el.uid) {
              iDidntPostThisListing = false
              return
            }

            if (el.uid === uid) {
              comingOnThisListing = true
              return
            }
          })
          return comingOnThisListing && iDidntPostThisListing
        })

        listings(listingsFromDB);
      })
    })
  })
}
    
export const addListing = (uid, carDocumentID, meetingPoint, destination, departureDate, departureTime, noSeats, storageAvail, success) => {
  const firestoreListings = firebase.firestore().collection('listings');

  firestoreListings.add({
    userDocumentID: uid,
    carDocumentID: carDocumentID,
    timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
    meetingPoint: meetingPoint,
    destination: destination,
    departureDate: departureDate,
    departureTime: departureTime,
    seatsAvailable: noSeats,
    storageSpace: storageAvail,
    whoWantsToCome: [],
    whosComing: []
  })
    .then((response) => success(true))
    .catch((error) => success(false));
}

export const addUserToRide = (currentUser, listingID, whoWantsToCome, success) => {
  const firestoreUser = firebase.firestore().doc('users/' + currentUser.uid);
  const firestoreListing = firebase.firestore().doc('listings/' + listingID);

  firestoreUser.onSnapshot(userInfo => {
    let user = {
        contactNum: userInfo._data.contactNum,
        firstName: userInfo._data.firstName,
        lastName: userInfo._data.lastName,
        email: currentUser.email,
        uid: currentUser.uid
    }

    whoWantsToCome.push(user);
    firestoreListing.update({
        whoWantsToCome: whoWantsToCome
    })
        .then((response) => {
            success(true)
        })
  })
}