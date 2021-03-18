import React, { useContext, useState } from 'react';

interface TabBarStatus {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
}

export const TabBarStatusContext = React.createContext<TabBarStatus>({
  isVisible: true,
  setVisible: () => {},
});

export const useIsTabBarVisible = () => {
  const value = useContext(TabBarStatusContext);
  return value.isVisible;
};

export const TabBarStatusProvider = ({ children }) => {
  const [isVisible, setVisible] = useState(true);

  return (
    <TabBarStatusContext.Provider value={{ isVisible, setVisible }}>
      {children}
    </TabBarStatusContext.Provider>
  );
};
