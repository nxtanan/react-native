import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  List,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import * as API_PATH from '../constants/APIPath';
import Style from '../css/Style';
import Toast from 'react-native-simple-toast';

const SongComponent = ({route, navigation}) => {
  const {params: songID} = route;
  const emptyData = {
    id: null,
    title: null,
    length: null,
    views: null,
    musician: null,
    singer: null,
    addDate: null,
  };
  const [song, setSong] = useState(emptyData);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_PATH.MOCK_API_SONG_GET_BY_ID}/${songID}`)
      .then(response => (response.ok ? response.json() : null))
      .then(json => {
        if (json) {
          setSong(json);
          setLoading(false);
        } else {
          setError(true);
        }
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [songID]);

  const imageID = songID >= 10 ? `7${songID}` : `70${songID}`;
  const imageSource = {uri: `https://picsum.photos/${imageID}`};
  const renderLeftAvatar = () => (
    <Avatar.Image size={50} source={imageSource} />
  );
  const renderRight = item => (
    <List.Subheader>
      <View>
        <Text>Views: {item.views}</Text>
      </View>
    </List.Subheader>
  );

  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator
          style={Style.noDataText}
          animating={true}
          color={Colors.red500}
        />
      ) : error ? (
        <Text style={Style.noDataText}>No data found</Text>
      ) : (
        <Card>
          <Card.Title
            title={song.title}
            subtitle={song.length}
            left={renderLeftAvatar}
            right={() => renderRight(song)}
          />
          <Card.Content>
            <Title>
              <View>
                <Text>{song.singer}</Text>
                <Text>{song.musician}</Text>
              </View>
            </Title>
            <Title>Lyrics</Title>
            <Paragraph>...some lyrics</Paragraph>
          </Card.Content>
          <Card.Cover source={imageSource} />
        </Card>
      )}
    </ScrollView>
  );
};

export default SongComponent;
