import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  ActivityIndicator,
  Colors,
  FAB,
  IconButton,
  List,
  Provider,
  Searchbar,
} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import * as API_PATH from '../constants/APIPath';
import * as COMPONENT_NAME from '../constants/ComponentName';
import ConfirmModalComponent from './ConfirmModalComponent';

const MusicComponent = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const [playList, setPlayList] = useState([]);
  const [playListTemp, setPlayListTemp] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState({});

  const showModal = song => {
    setTarget(song);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const getAllSongs = () => {
    // setLoading(true);
    fetch(API_PATH.MOCK_API_SONG_GET_ALL)
      .then(response => response.json())
      .then(json => {
        setPlayList(json);
        setPlayListTemp(json);
        setLoading(false);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllSongs();
  }, [isFocused]);

  const onChangeSearch = query => {
    setSearchQuery(query);
    setPlayList(
      playListTemp.filter(song =>
        song.title.toUpperCase().includes(query.toUpperCase()),
      ),
    );
  };

  const createRecent = (action, title) => {
    fetch(`${API_PATH.MOCK_API_RECENT_CREATE}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        createdAt: moment().format('DD/MM/YYYY'),
        action: action,
        target: title,
      }),
    })
      .then(() => console.log(`${action} Recent successfully`))
      .catch(error => console.log(error))
      .finally(() => console.log('Finally'));
  };

  const deleteSong = song => {
    song &&
      fetch(`${API_PATH.MOCK_API_SONG_DELETE}/${song.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          createRecent('Delete', song.title);
          getAllSongs();
          Toast.show('Delete successfully', 2000, Toast.CENTER);
          setTarget({});
          setVisible(false);
        })
        .catch(error =>
          Toast.show('Delete fail, please try again', 2000, Toast.CENTER),
        )
        .finally(() => {});
  };

  const renderSongTitle = song => (
    <View>
      <Text>{song.title}</Text>
      <Text>{song.singer}</Text>
      <Text>{song.length}</Text>
      <Text>Views: {song.views}</Text>
    </View>
  );
  const renderLeft = () => <List.Icon icon="music" />;
  const renderRight = song => (
    <View>
      <List.Subheader>
        <View>
          <IconButton
            icon="pen"
            color={Colors.blue500}
            size={20}
            onPress={() =>
              navigation.navigate(COMPONENT_NAME.SONG_CREATE_COMPONENT_NAME, {
                name: 'Update song',
                song,
              })
            }
          />
          <IconButton
            icon="delete"
            color={Colors.red500}
            size={20}
            onPress={() => showModal(song)}
          />
        </View>
      </List.Subheader>
    </View>
  );

  return (
    <Provider>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator animating={true} color={Colors.red800} />
        ) : (
          <List.Section>
            {playList.map((song, index) => (
              <List.Item
                key={song.id}
                title={renderSongTitle(song)}
                left={renderLeft}
                right={() => renderRight(song)}
                onPress={() =>
                  navigation.navigate(
                    COMPONENT_NAME.SONG_COMPONENT_NAME,
                    song.id,
                  )
                }
              />
            ))}
          </List.Section>
        )}
      </ScrollView>
      <ConfirmModalComponent
        isOpen={visible}
        song={target}
        onDismiss={hideModal}
        onConfirm={song => deleteSong(song)}
      />
      <FAB
        label="Add"
        uppercase={false}
        style={styles.fab}
        small
        icon="plus"
        onPress={() =>
          navigation.navigate(COMPONENT_NAME.SONG_CREATE_COMPONENT_NAME, {
            name: 'Create new song',
          })
        }
      />
    </Provider>
  );
};

const styles = StyleSheet.create({
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
});

export default MusicComponent;
