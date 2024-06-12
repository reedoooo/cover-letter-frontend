import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import React from 'react';
import { SidebarProvider } from 'contexts/SidebarProvider';
import { StoreProvider } from 'contexts/StoreProvider';
import ContextErrorBoundary from 'utils/ContextErrorBoundary';

// List of providers to be used in the ProviderWrapper
const providers = [SidebarProvider, StoreProvider, StyledEngineProvider];
// Function to wrap children with all providers
const ProviderWrapper = ({ children }) => {
  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};
export const Providers = ({ children }) => {
  return (
    <ContextErrorBoundary>
      <ProviderWrapper>{children}</ProviderWrapper>
    </ContextErrorBoundary>
  );
};

export default Providers;
