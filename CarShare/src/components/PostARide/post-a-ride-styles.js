import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  postARideCard: {
    width: '97%',
    borderRadius: 2,
    marginTop: 0
  },
  postARideCardTitle: {
    fontSize: 30,
    margin: 0,
    fontFamily: 'ribeye',
    fontWeight: '400',
  },
  divider: {
    display: 'none',
    margin: 0
  },
  indented: {
    margin: 10,
    paddingLeft: '3%'
  },
  datePicker: {
    width: '93%'
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16
  },
  predefinedPlacesDescription: {
    color: '#1faadb'
  },
});