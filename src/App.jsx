import React, { useRef } from 'react';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import useMode from './hooks/useMode';
import Home from './pages/Home';
import LetterBuilder from './pages/LetterBuilder';

function App() {
  const { theme } = useMode();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />{' '}
      <Router>
        <RouteContainer />
      </Router>
    </ThemeProvider>
  );
}

function RouteContainer() {
  const location = useLocation(); // This hook returns the current location object
  const nodeRef = useRef(null); // Create a ref here to pass to CSSTransition
  return (
    <TransitionGroup>
      <CSSTransition
        nodeRef={nodeRef} // Pass the ref to CSSTransition
        key={location.key}
        classNames="slide"
        timeout={300}
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cover-letter" element={<LetterBuilder />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
