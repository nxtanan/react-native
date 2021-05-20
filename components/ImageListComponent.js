import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {
  Container,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Spinner,
} from 'native-base';
import Style from '../css/Style';

const ImageListComponent = ({randomNumber}) => {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${randomNumber}&limit=10`)
      .then(response => (response.ok ? response.json() : []))
      .then(json => {
        setImageList(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [randomNumber]);

  return (
    <Container>
      <View>
        {isLoading ? (
          <Spinner />
        ) : (
          <DeckSwiper
            dataSource={imageList}
            renderItem={item => (
              <Card style={Style.NB_Card}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: `${item.download_url}`}} />
                    <Body>
                      <Text>{item.author}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    style={Style.RN_Image}
                    source={{uri: `${item.download_url}`}}
                  />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={Style.NB_Icon} />
                  <Text>{item.author}</Text>
                </CardItem>
              </Card>
            )}
          />
        )}
      </View>
    </Container>
  );
};

export default ImageListComponent;
