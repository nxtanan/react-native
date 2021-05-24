import React, {useEffect, useState, useContext} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Avatar, Card, Title, Paragraph, List} from 'react-native-paper';
import {Spinner} from 'native-base';
import * as Progress from 'react-native-progress';
import {createImageProgress} from 'react-native-image-progress';
import * as API_PATH from '../constants/APIPath';
import Style from '../css/Style';
import {store} from '../store/store';

const Image = createImageProgress(Card.Cover);

const SongComponent = ({route, navigation}) => {
  const {params: songID} = route;
  const [song, setSong] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const globalState = useContext(store);
  console.log(globalState.state.views);

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
      .catch(() => setError(true))
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
        <Text>State Views: {globalState.state.views ?? 0}</Text>
      </View>
    </List.Subheader>
  );

  return (
    <ScrollView>
      {isLoading ? (
        <Spinner />
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
            <Paragraph>
              ...some awesome beautiful amazing good job awesome beautiful
              amazing good job awesome beautiful amazing good job awesome
              beautiful amazing good job awesome beautiful amazing good job
              awesome beautiful amazing good job awesome beautiful amazing good
              job awesome beautiful amazing good job lyrics
            </Paragraph>
          </Card.Content>
          {/* <Card.Cover source={imageSource} /> */}
          <Image
            source={imageSource}
            indicator={Progress.Circle}
            style={Style.IP_Image}
          />
        </Card>
      )}
    </ScrollView>
  );
};

export default SongComponent;
