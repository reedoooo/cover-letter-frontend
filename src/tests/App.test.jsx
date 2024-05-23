// src/App.test.js
import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import App from 'App';
describe('Application root', () => {
  it('renders the App component without crashing', () => {
    render(<App />);
    // Tests that check specific outputs can be added here
  });
});
