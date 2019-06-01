import React from 'react';

export const CTX = React.createContext();

const initialState = {
  general: [
    { from: 'Rotimi', msg: 'Hello' },
    { from: 'John', msg: 'Hello' },
    { from: 'Titi', msg: 'Hello' },
  ],
  random: [
    { from: 'Jane', msg: 'Hello' },
    { from: 'Tom', msg: 'Hello' },
    { from: 'Jennifer', msg: 'Hello' },
  ],
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg,
          },
        ],
      };
    default:
      return state;
  }
}

const Store = props => {
  const reducerHook = React.useReducer(reducer, initialState);
  return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
};

export default Store;
