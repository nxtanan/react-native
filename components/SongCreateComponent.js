import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import * as API_PATH from '../constants/APIPath';
import moment from 'moment';
import PropTypes from 'prop-types';

const SongCreateComponent = ({route, navigation}) => {
  const emptyCreateData = {
    title: null,
    length: null,
    views: 0,
    musician: null,
    singer: null,
    addDate: moment().format('DD/MM/YYYY'),
  };
  const [createData, setCreateData] = useState(emptyCreateData);
  const [isLoading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const goBackMusic = () => {
    setLoading(false);
    navigation.goBack();
  };

  const handleSavePress = () => {
    setLoading(true);
    fetch(`${API_PATH.MOCK_API_SONG_CREATE}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createData),
    })
      .then(goBackMusic)
      .catch(error => setServerError(true))
      .finally(() => goBackMusic);
  };

  const hasLengthErrors = () => {
    const pattern = /^\d{2}:\d{2}?$/;
    if (!createData.length) {
      return false;
    }
    return !pattern.test(createData.length);
  };

  const disableButton = serverError || hasLengthErrors();

  return (
    <ScrollView>
      <HelperText type="error" visible={serverError}>
        Add song to playlist fail
      </HelperText>
      <TextInput
        label="Title"
        value={createData.title}
        onChangeText={text => setCreateData({...createData, title: text})}
      />
      <TextInput
        label="Musician"
        value={createData.musician}
        onChangeText={text => setCreateData({...createData, musician: text})}
      />
      <TextInput
        label="Signer"
        value={createData.singer}
        onChangeText={text => setCreateData({...createData, singer: text})}
      />
      <TextInput
        label="Length"
        value={createData.length}
        onChangeText={text => setCreateData({...createData, length: text})}
      />
      <HelperText type="error" visible={hasLengthErrors()}>
        Length must follows the format mm:ss
      </HelperText>
      <Button
        icon="plus"
        disabled={disableButton}
        onPress={handleSavePress}
        loading={isLoading}>
        Save
      </Button>
    </ScrollView>
  );
};

SongCreateComponent.propTypes = {
  createData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    musician: PropTypes.string.isRequired,
    singer: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
  }),
};

export default SongCreateComponent;
