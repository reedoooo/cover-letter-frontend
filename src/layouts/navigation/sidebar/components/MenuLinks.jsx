import {
  Menu,
  MenuItem,
  ListItemText,
  List,
  ListItem,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const generateLinks = (route, handleClick) => {
  return (
    <Box key={uniqueId(`${route.path}`)}>
      <MenuItem component={RouterLink} to={route.path} onClick={handleClick}>
        {route.icon}
        <ListItemText
          primary={
            <Typography variant={route.collapse ? 'h6' : 'body1'}>
              {route.name}
            </Typography>
          }
          inset={!route.collapse}
        />
      </MenuItem>
      {route.collapse && route.items && (
        <List component="div" disablePadding>
          {route.items.map(subRoute => generateLinks(subRoute, handleClick))}
        </List>
      )}
    </Box>
  );
};

const NavLinks = ({ routes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonRef = useRef(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        ref={buttonRef}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {routes.map(route => generateLinks(route, handleClose))}
      </Menu>
    </div>
  );
};

NavLinks.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NavLinks;
