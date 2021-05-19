import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 10,
    top: 0,
  },
  searchBar: {
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonContainer: {
    flex: 1,
  },
  snackBarContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listItemContainer: {
    borderStyle: 'dotted',
    borderBottomColor: 'black',
    borderBottomWidth: 0.8,
  },
  noDataText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 30,
  },
  bottomNavigation: {
    backgroundColor: '#66d9ff',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  iconButtonContainer: {
    marginRight: 80,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default Style;
