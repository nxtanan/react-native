import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import * as API_PATH from '../constants/APIPath';
import moment from 'moment';
import PropTypes from 'prop-types';

const SongCreateComponent = ({route, navigation}) => {
  const {
    params: {song},
  } = route;
  const emptyCreateData = {
    title: null,
    length: null,
    views: 0,
    musician: null,
    singer: null,
    addDate: moment().format('DD/MM/YYYY'),
  };
  const [data, setData] = useState(song ?? emptyCreateData);
  const [isLoading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const goBackMusic = () => {
    setLoading(false);
    navigation.goBack();
  };

  const createRecent = action => {
    fetch(`${API_PATH.MOCK_API_RECENT_CREATE}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        createdAt: moment().format('DD/MM/YYYY'),
        action: action,
        target: data.title,
      }),
    })
      .then(() => console.log(`${action} Recent successfully`))
      .catch(error => setServerError(true))
      .finally(() => console.log('Finally'));
  };

  const handleSavePress = () => {
    setLoading(true);
    if (song) {
      updateSong(song);
    } else {
      createSong();
    }
  };

  const createSong = () => {
    fetch(`${API_PATH.MOCK_API_SONG_CREATE}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        createRecent('Create');
        goBackMusic();
      })
      .catch(error => setServerError(true))
      .finally(() => goBackMusic);
  };

  const updateSong = () => {
    fetch(`${API_PATH.MOCK_API_SONG_UPDATE}/${data.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        createRecent('Update');
        goBackMusic();
      })
      .catch(error => setServerError(true))
      .finally(() => goBackMusic);
  };

  const hasLengthErrors = () => {
    const pattern = /^\d{2}:\d{2}?$/;
    if (!data.length) {
      return false;
    }
    return !pattern.test(data.length);
  };

  const disableButton = serverError || hasLengthErrors();

  return (
    <ScrollView>
      <HelperText type="error" visible={serverError}>
        Add song to playlist fail, please try again
      </HelperText>
      <TextInput
        label="Title"
        value={data.title}
        onChangeText={text => setData({...data, title: text})}
      />
      <TextInput
        label="Musician"
        value={data.musician}
        onChangeText={text => setData({...data, musician: text})}
      />
      <TextInput
        label="Signer"
        value={data.singer}
        onChangeText={text => setData({...data, singer: text})}
      />
      <TextInput
        label="Length"
        value={data.length}
        onChangeText={text => setData({...data, length: text})}
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
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    musician: PropTypes.string.isRequired,
    singer: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
  }),
};

export default SongCreateComponent;
