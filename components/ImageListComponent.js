import React, {useState, useEffect, useContext} from 'react';
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
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Style from '../css/Style';
import {store} from '../store/store';

const ImageListComponent = ({randomNumber}) => {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // const globalState = useContext(store);
  // console.log(globalState);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${randomNumber + 1}&limit=30`)
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
        {/* <Progress.Bar progress={0.3} width={200} />
        <Progress.Pie progress={0.4} size={50} />
        <Progress.Circle size={30} indeterminate={true} />
        <Progress.CircleSnail color={['red', 'green', 'blue']} /> */}
        {isLoading ? (
          <Spinner />
        ) : imageList.length === 0 ? (
          <Text style={Style.noDataText}>No data found</Text>
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
                    source={{uri: `${item.download_url}`}}
                    indicator={Progress.Circle}
                    style={Style.RN_Image}
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
