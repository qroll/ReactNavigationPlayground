import { useNavigation } from '@react-navigation/native';
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

  const navigate = React.useCallback(
    (...args) => {
      setPendingNavigation(true);
      navigationArgs.current = args;

      navigation
        .dangerouslyGetParent()
        ?.setOptions({ tabBarVisible: options.visible });
    },
    [options.visible, navigation, navigationArgs],
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
