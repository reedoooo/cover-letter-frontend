import React, { createContext, useState } from 'react';

export const SidebarContext = createContext({
  isSidebarOpen: false,
  isMobileSidebarOpen: false,
  setSidebarOpen: () => {},
  setMobileSidebarOpen: () => {},
  onClose: () => {},
  toggleSidebar: () => {},
  toggleMobileSidebar: () => {},
  toggleSidebarOpen: () => {},
});
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const onClose = () => {
    setSidebarOpen(false);
    setMobileSidebarOpen(false);
  };
  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        isMobileSidebarOpen,
        setMobileSidebarOpen,
        toggleSidebarOpen: () => setSidebarOpen(!isSidebarOpen),
        toggleMobileSidebar: () => setMobileSidebarOpen(true),
        onClose,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
export default SidebarProvider;
