import { createContext, useReducer } from 'react';

// Define initial state and reducer for the context
const INITIAL_STATE = {
  user: null,
  // Add other state properties if needed
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return {
        ...state,
        user: action.payload,
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const ChatContext = createContext(INITIAL_STATE);

export const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
