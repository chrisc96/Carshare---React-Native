import { StyleSheet, PixelRatio } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    borderWidth: 1,
    borderColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
  },
  noListingsTxt: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarContainer: {
    backgroundColor: "#FFF",
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingLeft: 15,
    paddingRight: 15,
  },
  listingContainer: {
    // borderColor: 'red',
    height: '80%',
    // borderWidth: 1,
  },
});
