import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  List,
  Searchbar,
  Button,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import * as API_PATH from '../constants/APIPath';

const MusicComponent = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const [playList, setPlayList] = useState([]);
  const [playListTemp, setPlayListTemp] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_PATH.MOCK_API_SONG_GET_ALL)
      .then(response => response.json())
      .then(json => {
        // const list = json.sort((a, b) => a.addDate > b.addDate);
        setPlayList(json);
        setPlayListTemp(json);
        setLoading(false);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [isFocused]);

  const onChangeSearch = query => {
    setSearchQuery(query);
    setPlayList(
      playListTemp.filter(song =>
        song.title.toUpperCase().includes(query.toUpperCase()),
      ),
    );
  };

  const renderSongTitle = song => (
    <View>
      <Text>
        {song.title} - {song.singer}
      </Text>
      <Text>{song.musician}</Text>
      <Text>Views: {song.views}</Text>
    </View>
  );
  const renderLeft = () => <List.Icon icon="music" />;
  const renderRight = song => (
    <List.Subheader>
      <View>
        <Text>{song.length}</Text>
        <Text>{song.addDate}</Text>
      </View>
    </List.Subheader>
  );
  const renderRightSubHeader = () => (
    <Button
      icon="plus"
      mode="text"
      onPress={() => navigation.navigate('SongCreate')}>
      Add
    </Button>
  );

  return (
    <ScrollView>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {isLoading ? (
        <ActivityIndicator animating={true} color={Colors.red800} />
      ) : (
        <List.Section>
          <List.Subheader>
            <List.Item title={'Music playlist'} right={renderRightSubHeader} />
          </List.Subheader>
          {playList.map((song, index) => (
            <List.Item
              key={index}
              title={renderSongTitle(song)}
              left={renderLeft}
              right={() => renderRight(song)}
              onPress={() => navigation.navigate('Song', {song, index})}
            />
          ))}
        </List.Section>
      )}
    </ScrollView>
  );
};

export default MusicComponent;
