import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {Card, Provider} from 'react-native-paper';
import {Spinner} from 'native-base';
import * as Progress from 'react-native-progress';
import {createImageProgress} from 'react-native-image-progress';

import Style from '../css/Style';

const Image = createImageProgress(Card.Cover);

const GalleryComponent = ({randomNumber}) => {
  const [isLoading, setLoading] = useState(true);
  const [imageList, setImageList] = React.useState([]);

  const renderSubtitle = image => (
    <Text>{`${image.width}x${image.height}`}</Text>
  );

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${randomNumber}&limit=10`)
      .then(response => (response.ok ? response.json() : []))
      .then(json => {
        setImageList(json);
        setLoading(false);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [randomNumber]);

  return (
    <Provider>
      {isLoading ? (
        <Spinner />
      ) : imageList.length === 0 ? (
        <Text style={Style.noDataText}>No data found</Text>
      ) : (
        <ScrollView>
          {imageList.map((image, index) => (
            <Card key={index}>
              <Card.Title
                title={image.author}
                subtitle={renderSubtitle(image)}
              />
              {/* <Card.Cover source={{uri: `${image.download_url}`}} /> */}
              <Image
                source={{uri: `${image.download_url}`}}
                indicator={Progress.Bar}
                style={Style.IP_Image}
              />
            </Card>
          ))}
        </ScrollView>
      )}
    </Provider>
  );
};

export default GalleryComponent;
