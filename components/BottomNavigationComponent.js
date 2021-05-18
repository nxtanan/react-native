import React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import MusicComponent from './MusicComponent';
import GalleryComponent from './GalleryComponent';
import DataTableComponent from './DataTableComponent';

const randomNumber = Math.floor(Math.random() * 20) + 1;

const MusicRoute = () => <MusicComponent />;
const ImagesRoute = () => <GalleryComponent randomNumber={randomNumber} />;
const VideosRoute = () => <Text>Videos</Text>;
const RecentRoute = () => <Text>Recent</Text>;
const TimerRoute = () => <DataTableComponent />;

const BottomNavigationComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'music', title: 'Musics', icon: 'music'},
    {key: 'image', title: 'Images', icon: 'image'},
    {key: 'video', title: 'Videos', icon: 'video'},
    {key: 'recent', title: 'Recent', icon: 'history'},
    {key: 'timer', title: 'Timer', icon: 'timer'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    image: ImagesRoute,
    video: VideosRoute,
    recent: RecentRoute,
    timer: TimerRoute,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{backgroundColor: '#66d9ff'}}
    />
  );
};

export default BottomNavigationComponent;
