import _ from 'lodash'

export const listingContains = (listing, searchInput) => {
    let meetingPoint = listing.firestoreDocument._data.meetingPoint.toLowerCase();
    let destination = listing.firestoreDocument._data.destination.toLowerCase();
    if (meetingPoint.includes(searchInput) || destination.includes(searchInput)) {
        return true
    }
    return false;
}