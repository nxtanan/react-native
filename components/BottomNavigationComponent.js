import React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import MusicComponent from './MusicComponent';
import GalleryComponent from './GalleryComponent';
import ImageListComponent from './ImageListComponent';

const randomNumber = Math.floor(Math.random() * 20) + 1;

const MusicRoute = () => <MusicComponent />;
const ImagesRoute = () => <GalleryComponent randomNumber={randomNumber} />;
const VideosRoute = () => <Text>Videos</Text>;
const ImageSwiperRoute = () => (
  <ImageListComponent randomNumber={randomNumber} />
);

const BottomNavigationComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'music', title: 'Musics', icon: 'music', color: '#2A8EAF'},
    {key: 'image', title: 'Images', icon: 'image', color: '#009688'},
    {
      key: 'swiper',
      title: 'Image Swiper',
      icon: 'image-multiple',
      color: '#2D7C55',
    },
    {key: 'video', title: 'Videos', icon: 'video', color: '#1B603D'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    image: ImagesRoute,
    swiper: ImageSwiperRoute,
    video: VideosRoute,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavigationComponent;
