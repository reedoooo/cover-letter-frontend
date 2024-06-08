import { Box, Container } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MainWrapper, PageWrapper } from 'components/styled';
import { SidebarContext } from 'contexts/SidebarProvider';
import Header from 'layouts/navigation/header/Header';
import Sidebar from 'layouts/navigation/sidebar/Sidebar';

const AdminLayout = props => {
  const {
    isSidebarOpen,
    isMobileSidebarOpen,
    toggleSidebar,
    toggleMobileSidebar,
    onSidebarClose,
  } = useContext(SidebarContext);
  // =========================================================
  // This is the main layout for the admin dashboard
  // It gives a variant view type for the application
  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={onSidebarClose}
      />
      {/* Main Wrapper */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
        />
        {/* PageContent */}
        <Container
          sx={{
            paddingTop: '20px',
            maxWidth: '1200px',
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          {/* End Page */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};
export default AdminLayout;
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Box>
//         <CssBaseline />
//         {/* Sidebar context provider */}
//         <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
//           {/* Sidebar component */}
//           <Sidebar routes={routes} display="none" {...rest} />
//           {/* Main content area */}
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               bgcolor: 'background.default',
//               minHeight: '100vh',
//               overflow: 'auto',
//               transition: theme.transitions.create(['margin', 'width'], {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen,
//               }),
//               marginLeft: toggleSidebar ? '0px' : '240px',
//             }}
//           >
//             {/* Navbar component */}
//             <Navbar
//               onOpen={() => setToggleSidebar(!toggleSidebar)}
//               logoText="Horizon UI Dashboard PRO"
//               brandText={getActiveRoute(routes)}
//               secondary={getActiveNavbar(routes)}
//               message={getActiveNavbarText(routes)}
//               fixed={fixed}
//               {...rest}
//             />
//             <Box sx={{ mx: 'auto', p: { xs: 2, md: 3 }, pt: 4 }}>
//               <Outlet />
//             </Box>
//             <Box>
//               <Footer />
//           </Box>
//         </SidebarContext.Provider>
//       </Box>
//     </Box>
//   );
// }
