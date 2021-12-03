import React, { useState } from "react";
const GlobalContext = React.createContext();

export function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  const isLoading = (loading) => {
    setLoading(loading);
  };

  const isSearchOverlay = (loading) => {
    setShowSearchOverlay(loading);
  };

  return (
    <GlobalContext.Provider
      value={{
        loading,
        isLoading,
        showSearchOverlay,
        isSearchOverlay,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
