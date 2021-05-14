import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Avatar, Card, Title, Paragraph, List, Button} from 'react-native-paper';

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
      <Button icon="plus" onPress={() => navigation.navigate('SongCreate')}>
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
