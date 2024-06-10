import React, { createContext, useState } from 'react';

export const SidebarContext = createContext({
  isSidebarOpen: false,
  isMobileSidebarOpen: false,
  onSidebarClose: () => {},
  toggleSidebar: () => {},
  toggleMobileSidebar: () => {},
});
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        isMobileSidebarOpen,
        setMobileSidebarOpen,
        toggleSidebarOpen: () => setSidebarOpen(!isSidebarOpen),
        toggleMobileSidebar: () => setMobileSidebarOpen(true),
        onSidebarClose: () => setMobileSidebarOpen(false),
        onMobileSidebarClose: () => setMobileSidebarOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
export default SidebarProvider;
