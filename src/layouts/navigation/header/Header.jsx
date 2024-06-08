import { Badge, Box, Button, IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { MenuIcon, NotificationsActiveIcon } from 'assets/humanIcons';
import { AppBarStyled, ToolbarStyled } from 'components/styled';
// const { NotificationsActiveIcon, MenuIcon } = reedThaHumansIconLibrary;
// components
import Profile from './Profile';

const Header = props => {
  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <MenuIcon width="20" height="20" />
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(props.anchorEl2 && {
              color: 'primary.main',
            }),
          }}
        >
          <Badge variant="dot" color="primary">
            <NotificationsActiveIcon size="21" stroke="1.5" />
          </Badge>
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            target="_blank"
            href="https://adminmart.com/product/modernize-react-mui-dashboard-template/"
          >
            Upgrade to Pro
          </Button>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func,
  anchorEl2: PropTypes.object,
};

export default Header;
