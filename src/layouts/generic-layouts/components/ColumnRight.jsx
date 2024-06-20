import {
  Box,
  CardHeader,
  CardActions,
  Grid,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLayout, RCBox } from 'components/index';
import APIModal from 'components/themedV2/apiModal';
import { templateData } from 'config/data';
import useMode from 'hooks/useMode';

const ColumnRight = () => {
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [apiKey, setApiKey] = React.useState(
    localStorage.getItem('apiKey') || ''
  );

  const leftRCBoxRef = useRef(null);
  const rightRCBoxRef = useRef(null);

  const menuData = Object.entries(templateData).reduce((acc, [key, value]) => {
    if (value.type === 'template') {
      acc.push(value);
    }
    return acc;
  }, []);

  const handleListItemClick = index => {
    setSelectedIndex(index);
  };

  return (
    <PageLayout>
      <Grid
        item
        container
        xs={12}
        sx={{
          padding: '16px',
          borderRight: '1px solid #ddd',
          mt: '3.5rem',
        }}
      >
        <Grid
          item
          xs={8.5}
          style={{ padding: '16px', borderRight: '1px solid #ddd' }}
        >
          <RCBox theme={theme} variant="card" ref={leftRCBoxRef}>
            <Box
              height="100%"
              minHeight="100vh"
              maxWidth="100%"
              sx={{ overflowX: 'hidden', m: 0, p: 0 }} // Ensure no margins or paddings
            >
              <Grid
                container
                sx={{ minHeight: '100vh', maxWidth: '80vw', m: 0, p: 0 }}
              >
                <Outlet />
              </Grid>
            </Box>
          </RCBox>
        </Grid>
        <Grid item xs={3.5} style={{ padding: '16px' }}>
          <RCBox variant="card" ref={rightRCBoxRef}>
            <CardHeader title="Templates" />
            <Divider sx={{ color: theme.palette.text.secondary, my: 1 }} />
            <List dense={true}>
              {menuData.map((template, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleListItemClick(index)}
                  sx={{
                    backgroundColor:
                      selectedIndex === index
                        ? theme.palette.grey[100]
                        : 'transparent',
                    color:
                      selectedIndex === index
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: `${theme.palette.grey[200]}CC`, // Increased transparency
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ListItemButton
                    sx={{
                      padding: '8px 16px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: isMobile ? 'column' : 'row',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          selectedIndex === index
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                        minWidth: '36px',
                        fontSize: 'clamp(16px, 2vw, 24px)',
                      }}
                    >
                      {template.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={template.title}
                      sx={{
                        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                        whiteSpace: isMobile ? 'normal' : 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: isMobile ? 'none' : 'block', // Hide text on small screens
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ color: theme.palette.text.secondary, my: 1 }} />
            <Box mt={2}>
              <APIModal setApiKey={setApiKey} sidebar={true} />
            </Box>
            <CardActions>
              <Box>{/* Footer content goes here */}</Box>
            </CardActions>
          </RCBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default ColumnRight;
