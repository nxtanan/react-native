import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  RNP_List_Item: {
    borderStyle: 'dotted',
    borderBottomColor: 'black',
    borderBottomWidth: 0.8,
  },
  noDataText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 30,
  },
  RN_View: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  RNP_IconButton: {
    marginRight: 80,
  },
  RNP_Modal_Content: {
    backgroundColor: 'white',
    padding: 20,
  },
  NB_Card: {
    elevation: 3,
  },
  RN_Image: {
    height: 300,
    flex: 1,
  },
  NB_Icon: {
    color: '#ED4A6A',
  },
  NB_Button: {
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default Style;
