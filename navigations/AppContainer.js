import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomNavigationComponent from '../components/BottomNavigationComponent';
import MusicComponent from '../components/MusicComponent';
import SongComponent from '../components/SongComponent';
import SongCreateComponent from '../components/SongCreateComponent';

const Stack = createStackNavigator();

const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={BottomNavigationComponent} />
      <Stack.Screen name="Music" component={MusicComponent} />
      <Stack.Screen name="Song" component={SongComponent} />
      <Stack.Screen name="SongCreate" component={SongCreateComponent} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppContainer;
