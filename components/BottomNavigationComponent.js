import React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import MusicComponent from './MusicComponent';
import GalleryComponent from './GalleryComponent';
import Style from '../css/Style';

const randomNumber = Math.floor(Math.random() * 20) + 1;

const MusicRoute = () => <MusicComponent />;
const ImagesRoute = () => <GalleryComponent randomNumber={randomNumber} />;
const VideosRoute = () => <Text>Videos</Text>;
const RecentRoute = () => <Text>Recent</Text>;
const TimerRoute = () => <Text>Timer</Text>;

const BottomNavigationComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'music', title: 'Musics', icon: 'music', color: '#66d9ff'},
    {key: 'image', title: 'Images', icon: 'image', color: '#009688'},
    {key: 'video', title: 'Videos', icon: 'video', color: '#795548'},
    {key: 'recent', title: 'Recent', icon: 'history', color: '#607D8B'},
    {key: 'timer', title: 'Timer', icon: 'timer', color: '#3F51B5'},
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
      barStyle={Style.bottomNavigation}
    />
  );
};

export default BottomNavigationComponent;
