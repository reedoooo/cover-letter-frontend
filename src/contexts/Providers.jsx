import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import React from 'react';
import { ColorModeProvider } from 'contexts/ColorModeProvider';
import { SidebarProvider } from 'contexts/SidebarProvider';
import { StoreProvider } from 'contexts/StoreProvider';

// List of providers to be used in the ProviderWrapper
const providers = [
  ColorModeProvider,
  SidebarProvider,
  StoreProvider,
  StyledEngineProvider,
];
// Function to wrap children with all providers
const ProviderWrapper = ({ children }) => {
  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};
export const Providers = ({ children }) => {
  return <ProviderWrapper>{children}</ProviderWrapper>;
};

export default Providers;
