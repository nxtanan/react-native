import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {
  Card,
  Searchbar,
  ActivityIndicator,
  Colors,
  Provider,
} from 'react-native-paper';
import Style from '../css/Style';

const GalleryComponent = ({randomNumber}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [imageList, setImageList] = React.useState([]);

  const renderSubtitle = image => (
    <Text>{`${image.width}x${image.height}`}</Text>
  );

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${randomNumber}&limit=10`)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setImageList(json);
        setLoading(false);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [randomNumber]);

  const onChangeSearch = query => {
    setSearchQuery(query);
    setImageList(
      data.filter(image =>
        image.author.toUpperCase().includes(query.toUpperCase()),
      ),
    );
  };

  return (
    <Provider>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {isLoading ? (
        <ActivityIndicator
          style={Style.noDataText}
          animating={true}
          color={Colors.red500}
        />
      ) : (
        <ScrollView>
          {imageList.map((image, index) => (
            <Card key={index}>
              <Card.Title
                title={image.author}
                subtitle={renderSubtitle(image)}
              />
              <Card.Cover source={{uri: `${image.download_url}`}} />
            </Card>
          ))}
        </ScrollView>
      )}
    </Provider>
  );
};

export default GalleryComponent;
