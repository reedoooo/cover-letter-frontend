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
        isMobileSidebarOpen,
        toggleSidebar: () => setSidebarOpen(!isSidebarOpen),
        toggleMobileSidebar: () => setMobileSidebarOpen(true),
        onSidebarClose: () => setMobileSidebarOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
export default SidebarProvider;
