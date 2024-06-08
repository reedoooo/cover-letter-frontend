import {
  Avatar,
  Box,
  Icon,
  Menu,
  IconButton as MenuButton,
  MenuItem,
  MenuList,
  Typography as Text,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { MdNotificationsNone } from 'react-icons/md';
import routes from '@/routes';
import { ItemContent } from 'components/themedV2/menu/ItemContent';
import useMode from 'hooks/useMode';
import { SidebarResponsive } from 'layouts/navigation/sidebar/Sidebar';
import { SearchBar } from './searchBar/SearchBar';

export default function HeaderLinks(props) {
  const { secondary, open } = props;
  const { theme, colorModeValues } = useMode();
  const navbarIcon = colorModeValues('gray.400', 'white');
  const menuBg = colorModeValues('white', 'navy.800');
  const textColor = colorModeValues('secondaryGray.900', 'white');
  const textColorBrand = colorModeValues('brand.700', 'brand.400');
  const ethColor = colorModeValues('gray.700', 'white');
  const borderColor = colorModeValues('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const ethBg = colorModeValues('secondaryGray.300', 'navy.900');
  const ethBox = colorModeValues('white', 'navy.800');
  const shadow = colorModeValues(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
  );
  const borderButton = colorModeValues('secondaryGray.500', 'whiteAlpha.200');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: secondary ? { xs: 'wrap', md: 'nowrap' } : 'unset',
        p: 1,
        borderRadius: '30px',
        background: menuBg,
        boxShadow: shadow,
        width: { xs: '100%', md: 'auto' },
      }}
    >
      {/* =============== [SEARCH INPUT] =============== */}
      <SearchBar
        mb={secondary ? { xs: 1, md: 'unset' } : 'unset'}
        me={1}
        borderRadius="30px"
      />
      {/* =============== [SIDEBAR EXPOSURE] =============== */}
      <SidebarResponsive routes={routes} open={open} />
      {/* =============== [NOTIFICATION MENU] =============== */}
      <Menu>
        <MenuButton sx={{ p: 0 }}>
          <Icon
            sx={{ mt: 0.75, width: 18, height: 18, mr: 1 }}
            as={MdNotificationsNone}
            color={navbarIcon}
          />
        </MenuButton>
        <MenuList
          sx={{
            boxShadow: shadow,
            p: 2,
            borderRadius: '20px',
            backgroundColor: menuBg,
            border: 'none',
            mt: 2.75,
            mr: { xs: 3, md: 'unset' },
            minWidth: { xs: 'unset', md: 400, xl: 450 },
            maxWidth: { xs: 360, md: 'unset' },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            mb={2}
          >
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={textColorBrand}
              ms="auto"
              sx={{ cursor: 'pointer' }}
            >
              Mark all read
            </Text>
          </Box>
          <Box display="flex" flexDirection="column">
            <MenuItem
              sx={{
                '&:hover': { backgroundColor: 'none' },
                '&:focus': { backgroundColor: 'none' },
                px: 0,
                borderRadius: 1,
                mb: 1,
              }}
            >
              <ItemContent info="Horizon UI Dashboard PRO" aName="Alicia" />
            </MenuItem>
            <MenuItem
              sx={{
                '&:hover': { backgroundColor: 'none' },
                '&:focus': { backgroundColor: 'none' },
                px: 0,
                borderRadius: 1,
                mb: 1,
              }}
            >
              <ItemContent
                info="Horizon Design System Free"
                aName="Josh Henry"
              />
            </MenuItem>
          </Box>
        </MenuList>
      </Menu>
      {/* =============== [USER MENU] =============== */}
      <Avatar
        sx={{
          '&:hover': { cursor: 'pointer' },
          color: 'white',
          backgroundColor: '#11047A',
          width: 40,
          height: 40,
        }}
        name="Adela Parkson"
      />
      <Box display="flex" width="100%" mb={0}>
        <Typography
          color={textColor}
          borderColor={borderColor}
          sx={{
            paddingLeft: 2.5,
            paddingTop: 2,
            paddingBottom: 1.25,
            width: '100%',
            fontSize: 'sm',
            fontWeight: '700',
          }}
        >
          👋&nbsp; Hey, Adela
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" p={1}>
        <Typography fontSize="sm" sx={{ px: 1.75 }}>
          Profile Settings
        </Typography>
        <Typography fontSize="sm" sx={{ px: 1.75 }}>
          Newsletter Settings
        </Typography>
        <Typography fontSize="sm" sx={{ px: 1.75, color: 'error.main' }}>
          Log out
        </Typography>
      </Box>
    </Box>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
  open: PropTypes.bool.isRequired, // Add this line
};
