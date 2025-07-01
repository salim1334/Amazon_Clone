import React, { createContext, useReducer } from 'react';

const DataContext = createContext();

function DataProvider({children, reducer, initialState}) {

  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider };