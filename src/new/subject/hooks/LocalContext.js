import React from 'react';

export const LocalContext = React.createContext({});

export function useLocalContext() {
  return React.useContext(LocalContext);
}
