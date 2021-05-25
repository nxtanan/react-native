import React, {createContext, useReducer} from 'react';
import {
  HELLO_ACTION,
  INCREASE_ACTION,
  DECREASE_ACTION,
} from '../constants/Action';

const initialState = {};
const store = createContext(initialState);
const {Provider} = store;

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case HELLO_ACTION.type:
        return {...currentState, hello: (currentState.hello ?? '') + 'Hello'};
      case INCREASE_ACTION.type:
        return {...currentState, views: (currentState.views ?? 0) + 1};
      case DECREASE_ACTION.type:
        return {...currentState, views: (currentState.views ?? 0) - 1};
      default:
        return currentState;
      // throw new Error();
    }
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {store, StateProvider};
