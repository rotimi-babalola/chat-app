import React from 'react';
import io from 'socket.io-client';

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
  console.log(action, '>>>');
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

let socket;

// this should get called after the Store
// has mounted
const sendChatAction = value => {
  socket.emit('chat message', value);
};

const Store = props => {
  const user = `Rotimi${Math.random(100).toFixed(2)}`;

  const [allChats, dispatch] = React.useReducer(reducer, initialState);
  if (!socket) {
    socket = io(':3001');

    socket.on('chat message', msg => {
      dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
    });
  }

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
};

export default Store;
