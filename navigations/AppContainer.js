import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as COMPONENT_NAME from '../constants/ComponentName';

import BottomNavigationComponent from '../components/BottomNavigationComponent';
import MusicComponent from '../components/MusicComponent';
import SongComponent from '../components/SongComponent';
import SongCreateComponent from '../components/SongCreateComponent';

const Stack = createStackNavigator();

const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name={COMPONENT_NAME.HOME_COMPONENT_NAME}
        component={BottomNavigationComponent}
      />
      <Stack.Screen
        name={COMPONENT_NAME.MUSIC_COMPONENT_NAME}
        component={MusicComponent}
      />
      <Stack.Screen
        name={COMPONENT_NAME.SONG_COMPONENT_NAME}
        component={SongComponent}
      />
      <Stack.Screen
        name={COMPONENT_NAME.SONG_CREATE_COMPONENT_NAME}
        component={SongCreateComponent}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppContainer;
