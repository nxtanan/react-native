import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Avatar, Card, Title, Paragraph, List, Button} from 'react-native-paper';
import * as COMPONENT_NAME from '../constants/ComponentName';

const SongComponent = ({route, navigation}) => {
  const {
    params: {song, index},
  } = route;

  const imageSource = {uri: `https://picsum.photos/70${index}`};
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
      <Button
        icon="plus"
        onPress={() =>
          navigation.navigate(COMPONENT_NAME.SONG_CREATE_COMPONENT_NAME)
        }>
        Save
      </Button>
      <Card>
        <Card.Title
          title={song.title}
          subtitle={song.length}
          left={renderLeftAvatar}
          right={() => renderRight(song)}
        />
        <Card.Content>
          <Title>Lyrics</Title>
          <Paragraph>...some lyrics</Paragraph>
        </Card.Content>
        <Card.Cover source={imageSource} />
      </Card>
    </ScrollView>
  );
};

export default SongComponent;
