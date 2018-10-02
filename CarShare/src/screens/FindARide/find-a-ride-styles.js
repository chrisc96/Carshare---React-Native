import { StyleSheet, PixelRatio } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    width: '100%',
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
    marginLeft: -15,
    marginRight: -15,
  },
  listingContainer: {
    borderColor: 'red',
    borderWidth: 1,
    paddingBottom: '19%',
  }
});
