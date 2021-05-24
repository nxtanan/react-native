/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AppContainer from './navigations/AppContainer';
import {StateProvider} from './store/store';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    background: '#F1F7ED',
    surface: '#F1F7ED',
    text: '#001021',
    error: '#B71F0E',
    disabled: '#BEC6C6',
    placeholder: '#1481BA',
    backdrop: '#001021',
  },
};

const App: () => Node = () => {
  return (
    <StateProvider theme={theme}>
      <AppContainer />
    </StateProvider>
  );
};

export default App;
