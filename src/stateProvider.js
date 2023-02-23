import React, { createContext, useContext, useReducer } from "react";

//setting up state provider

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
    {/* children is essentially our entire app  */}
    {/* push the user into the data layer and retrieve this anywhere from the app */}
    {/* a reducer listens for actions that are 'shot' at the data layer */}
    {/* Reducer is like a listener  */}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

// https://youtu.be/Oo4ziTddOxs?t=11978
