import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import App from 'app/App';
import { store } from 'store'; // Assuming you have configured your store here
import { ColorModeProvider } from './contexts';

// =========================================================
// [index] | This is the entry point for the application
// =========================================================
const reportRecoverableError = ({ error, cause, componentStack }) => {
  console.error('Recoverable Error:', error);
  console.error('Error Cause:', cause);
  console.error('Component Stack:', componentStack);
};

const container = document.getElementById('root');
const root = createRoot(container, {
  onRecoverableError: (error, errorInfo) => {
    reportRecoverableError({
      error,
      cause: error.cause,
      componentStack: errorInfo.componentStack,
    });
  },
});

root.render(
  <ReduxProvider store={store}>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </ReduxProvider>
);
