import React, {createContext, useReducer} from 'react';
import * as ACTION from '../constants/Action';

const initialState = {};
const store = createContext(initialState);
const {Provider} = store;

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case ACTION.SAY_HELLO:
        const newStateHello = {...currentState, hello: 'Hế nô'};
        return newStateHello;
      case ACTION.INCREASE_VIEWS:
        const newStateIncrease = {
          ...currentState,
          views: (currentState.views ?? 0) + 1,
        };
        return newStateIncrease;
      case ACTION.DECREASE_VIEWS:
        const newStateDecrease = {
          ...currentState,
          views: (currentState.views ?? 0) - 1,
        };
        return newStateDecrease;
      default:
        return currentState;
      // throw new Error();
    }
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {store, StateProvider};
