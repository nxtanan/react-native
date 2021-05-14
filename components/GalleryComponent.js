import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {Card, Searchbar} from 'react-native-paper';

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
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
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
    </View>
  );
};

export default GalleryComponent;
