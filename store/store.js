import React, {createContext, useReducer} from 'react';
import * as ACTION from '../constants/Action';

const initialState = {};
const store = createContext(initialState);
const {Provider} = store;

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case ACTION.SAY_HELLO:
        return {...currentState, hello: 'Hế nô'};
      case ACTION.INCREASE_VIEWS:
        return {
          ...currentState,
          views: (currentState.views ?? 0) + 1,
        };
      case ACTION.DECREASE_VIEWS:
        return {
          ...currentState,
          views: (currentState.views ?? 0) - 1,
        };
      default:
        return currentState;
      // throw new Error();
    }
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {store, StateProvider};
