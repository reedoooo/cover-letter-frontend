import { useState } from 'react';

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
  };
};

export default useMenu;
