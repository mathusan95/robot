// MockContextProvider
import React, { createContext } from 'react';
import propTypes from 'prop-types';

// Create a mock context
export const MockContext = createContext();

export const MockContextProvider = ({ children, value }) => (
  <MockContext.Provider value={value}>{children}</MockContext.Provider>
);
MockContextProvider.propTypes = {
  children: propTypes.node,
  value: propTypes.object
};
