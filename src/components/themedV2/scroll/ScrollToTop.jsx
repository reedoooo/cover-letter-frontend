import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.includes('/templates')) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return <>{children}</>;
};
export default ScrollToTop;
