import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';

interface TabBarStatus {
  show: boolean;
  setShow: (show: boolean) => void;
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
}

export const TabBarStatusContext = React.createContext<TabBarStatus>({
  show: true,
  setShow: () => {},
  isVisible: true,
  setVisible: () => {},
});

export const useIsTabBarVisible = () => {
  const value = useContext(TabBarStatusContext);
  return value.isVisible;
};

export const useSetTabBarVisible = () => {
  const value = useContext(TabBarStatusContext);
  return value.setShow;
};

export const TabBarStatusProvider = ({ children }) => {
  const [show, setShow] = useState(true);
  const [isVisible, setVisible] = useState(true);

  return (
    <TabBarStatusContext.Provider
      value={{ show, setShow, isVisible, setVisible }}>
      {children}
    </TabBarStatusContext.Provider>
  );
};

interface NavigateAfterTabAnimationOptions {
  visible: boolean;
}

export const useNavigateAfterTabAnimation = (
  options: NavigateAfterTabAnimationOptions,
) => {
  const navigation = useNavigation();
  const [hasPendingNavigation, setPendingNavigation] = useState(false);
  const navigationArgs = React.useRef<any[] | undefined>(undefined);
  const isVisible = useIsTabBarVisible();
  const setTabBarVisible = useSetTabBarVisible();

  const navigate = React.useCallback(
    (...args) => {
      setPendingNavigation(true);
      navigationArgs.current = args;

      setTabBarVisible(options.visible);
    },
    [options.visible, navigationArgs, setTabBarVisible],
  );

  React.useEffect(() => {
    const desiredVisiblity = isVisible === options.visible;

    if (desiredVisiblity && hasPendingNavigation) {
      navigation.navigate(...(navigationArgs.current as any));
      setPendingNavigation(false);
    }
  }, [options.visible, isVisible, navigation, hasPendingNavigation]);

  return navigate;
};
