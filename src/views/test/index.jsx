/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import {
  Grid,
  Box,
  Typography,
  styled,
  alpha,
  MenuList,
  MenuItem,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { templateData } from 'config/data';
import useMode from 'hooks/useMode';
import useRouter from 'hooks/useRouter';

const StyledMenuList = styled(props => (
  <MenuList
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 2,
    marginTop: theme.spacing(1),
    minWidth: 180,
    maxWidth: 350,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    backgroundColor: alpha('#000000', 0.8), // Very translucent black background
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
      display: 'flex',
      flexWrap: 'wrap',
    },
    '& .MuiMenuItem-root': {
      fontWeight: '400', // Adjust this to match ESLint text style
      color: '#FFFFFF', // Adjust this to match ESLint text style
      lineHeight: 1.5, // Adjust this to match ESLint text style
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function Test() {
  const { theme } = useMode();
  const { navigate } = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [menuItemsVisible, setMenuItemsVisible] = useState(false);
  const getInfoRef = React.useRef(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    getInfoRef.current = templateData;
    setMenuVisible(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuVisible(false);
    setMenuExpanded(false);
    setMenuItemsVisible(false);
  };

  useEffect(() => {
    if (menuVisible) {
      setTimeout(() => {
        setMenuExpanded(true);
      }, 500); // Delay for initial visibility animation
    }
  }, [menuVisible]);

  useEffect(() => {
    if (menuExpanded) {
      setTimeout(() => {
        setMenuItemsVisible(true);
      }, 500); // Delay for menu items animation
    }
  }, [menuExpanded]);

  // Split templateData into two columns
  const half = Math.ceil(templateData.length / 2);
  const firstColumn = templateData.slice(0, half);
  const secondColumn = templateData.slice(half);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          width: '50vw',
          textAlign: 'center',
          border: `1px solid ${alpha('#000', 0.2)}`,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb="10px">
          Test Routes
        </Typography>
        <StyledMenuList>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {firstColumn.map((route, index) => (
                <MenuItem key={index} component={NavLink} to={route.path}>
                  {route.name}
                </MenuItem>
              ))}
            </Grid>
            <Grid item xs={6}>
              {secondColumn.map((route, index) => (
                <MenuItem key={index} component={NavLink} to={route.path}>
                  {route.name}
                </MenuItem>
              ))}
            </Grid>
          </Grid>
        </StyledMenuList>
      </Box>
    </Grid>
  );
}

export default Test;