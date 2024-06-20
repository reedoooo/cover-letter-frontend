import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import React from 'react';
import ContextErrorBoundary from 'utils/ContextErrorBoundary';
import * as providers from './index';

const providerList = [
  providers.UserProvider,
  providers.PromptProvider,
  providers.ChatProvider,
  providers.AuthProvider,
  providers.AppProvider,
  StyledEngineProvider,
];

const ProviderWrapper = ({ children }) => {
  return providerList.reduce(
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
