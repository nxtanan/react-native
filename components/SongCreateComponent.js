import moment from 'moment';
import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Text,
} from 'native-base';
import React, {useState} from 'react';
import Toast from 'react-native-simple-toast';
// import {ScrollView} from 'react-native';
// import {TextInput, Button, HelperText} from 'react-native-paper';
import * as API_PATH from '../constants/APIPath';
import Style from '../css/Style';

const SongCreateComponent = ({route, navigation}) => {
  const {
    params: {song},
  } = route;
  const initialData = {
    title: null,
    length: null,
    views: 0,
    musician: null,
    singer: null,
    addDate: moment().format('DD/MM/YYYY'),
  };
  const [data, setData] = useState(song ?? initialData);
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

  const handleSubmit = () => {
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
      .then(response => {
        if (response.ok) {
          createRecent('Create');
          Toast.show('Create successfully', 2000, Toast.CENTER);
          goBackMusic();
        } else {
          Toast.show('Create fail, please try again', 2000, Toast.CENTER);
          setLoading(false);
        }
      })
      .catch(error => {
        setServerError(true);
      })
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
      .then(response => {
        if (response.ok) {
          createRecent('Update');
          Toast.show('Update successfully', 2000, Toast.CENTER);
          goBackMusic();
        } else {
          Toast.show('Update fail, please try again', 2000, Toast.CENTER);
          setLoading(false);
        }
      })
      .catch(error => {
        setServerError(true);
      })
      .finally(() => goBackMusic);
  };

  const hasLengthErrors = () => {
    const pattern = /^\d{2}:\d{2}?$/;
    if (!data.length) {
      return false;
    }
    return !pattern.test(data.length);
  };

  const disabledButton = serverError || hasLengthErrors() || isLoading;

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Title</Label>
            <Input
              value={data.title}
              onChangeText={text => setData({...data, title: text})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Musician</Label>
            <Input
              value={data.musician}
              onChangeText={text => setData({...data, musician: text})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Singer</Label>
            <Input
              value={data.singer}
              onChangeText={text => setData({...data, singer: text})}
            />
          </Item>
          <Item floatingLabel error={hasLengthErrors()} last>
            <Label>Length</Label>
            <Input
              value={data.length}
              onChangeText={text => setData({...data, length: text})}
            />
            {hasLengthErrors() ? <Icon name="close-circle" /> : null}
          </Item>
          <Button
            disabled={disabledButton}
            style={Style.NB_Button}
            onPress={handleSubmit}>
            <Text>Submit</Text>
          </Button>
        </Form>
      </Content>
    </Container>
    // <ScrollView>
    //   <HelperText type="error" visible={serverError}>
    //     Add song to playlist fail, please try again
    //   </HelperText>
    //   <TextInput
    //     label="Title"
    //     value={data.title}
    //     onChangeText={text => setData({...data, title: text})}
    //   />
    //   <TextInput
    //     label="Musician"
    //     value={data.musician}
    //     onChangeText={text => setData({...data, musician: text})}
    //   />
    //   <TextInput
    //     label="Signer"
    //     value={data.singer}
    //     onChangeText={text => setData({...data, singer: text})}
    //   />
    //   <TextInput
    //     label="Length"
    //     value={data.length}
    //     onChangeText={text => setData({...data, length: text})}
    //   />
    //   <HelperText type="error" visible={hasLengthErrors()}>
    //     Length must follows the format mm:ss
    //   </HelperText>
    //   <Button
    //     icon="plus"
    //     disabled={disableButton}
    //     onPress={handleSavePress}
    //     loading={isLoading}>
    //     Save
    //   </Button>
    // </ScrollView>
  );
};

export default SongCreateComponent;
