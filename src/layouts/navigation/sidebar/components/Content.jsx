import { Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import styled from 'styled-components';
import { RCFlex } from 'components/themed/RCFlex';
import useMode from 'hooks/useMode';
import Brand from './Brand';
import Links from './old/Links';
// import Links from './MenuLinks';
// import NavbarLogo from './NavbarLogo';

export const Content = ({ routes }) => {
  const { theme } = useMode();
  const borderRadius = theme.borders.borderRadius.md;
  console.log('Content -> borderRadius', routes);
  return (
    <RCFlex
      direction="column"
      height="100%"
      pt="25px"
      px="16px"
      borderRadius="30px"
    >
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: '16px', '2xl': '1px' }}>
          <Links routes={routes} />
        </Box>
      </Stack>
    </RCFlex>
  );
};

Content.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const SidebarContent = ({ routes }) => Content({ routes });

export default SidebarContent;

// const Icon = ({ icon }) => (
//   <span className="material-symbols-outlined">{icon}</span>
// );

// const NavButton = ({ onClick, name, icon, isActive, hasSubNav }) => (
//   <button
//     type="button"
//     onClick={() => onClick(name)}
//     className={isActive ? 'active' : ''}
//   >
//     {icon && <Icon icon={icon} />}
//     <span>{name}</span>
//     {hasSubNav && <Icon icon="expand_more" />}
//   </button>
// );

// const SubMenu = ({ item, activeItem, handleClick }) => {
//   const navRef = useRef(null);

//   const isSubNavOpen = (item, items) =>
//     items.some(i => i === activeItem) || item === activeItem;

//   return (
//     <div
//       className={`sub-nav ${isSubNavOpen(item.name, item.items) ? 'open' : ''}`}
//       style={{
//         height: !isSubNavOpen(item.name, item.items)
//           ? 0
//           : navRef.current?.clientHeight,
//       }}
//     >
//       <div ref={navRef} className="sub-nav-inner">
//         {item?.items.map(subItem => (
//           <NavButton
//             key={subItem}
//             onClick={handleClick}
//             name={subItem}
//             isActive={activeItem === subItem}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// const StyledWrapper = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'row',
//   flex: '0 0 auto',
//   width: '100%',
//   background: '#1976d2', // theme.palette.primary.main,
//   color: 'white',
//   // [theme.breakpoints.down('md')]: {
//   //   flexDirection: 'column',
//   //   width: 220,
//   //   maxWidth: 220,
//   //   minWidth: 220,
//   // },
// }));
// const NavHeader = theme => (
//   <header className="sidebar-header">
//     <StyledWrapper theme={theme}>
//       <Brand />
//     </StyledWrapper>
//     <button type="button">
//       <Icon icon="menu" />
//     </button>
//     <span>Admin</span>
//   </header>
// );
