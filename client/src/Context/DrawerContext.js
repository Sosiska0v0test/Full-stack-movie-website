import React, { createContext, useMemo, useState } from "react";

export const SidebarContext = createContext();

function DrawerContext({ children }) {
  const [progress, setprogress] = useState(0);
  const value = useMemo(
    () => ({ progress, setprogress }),
    [progress]
  );
  return (
    <SidebarContext.Provider value={ value }>{ children }</SidebarContext.Provider>
  );
}

export default DrawerContext;
