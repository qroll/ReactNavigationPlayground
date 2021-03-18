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
  const navigationInfo = React.useRef<{
    hasPendingNavigation: boolean;
    args: any[] | undefined;
  }>({ hasPendingNavigation: false, args: undefined }).current;
  const isVisible = useIsTabBarVisible();

  const navigate = React.useCallback(
    (...args) => {
      navigationInfo.hasPendingNavigation = true;
      navigationInfo.args = args;

      navigation
        .dangerouslyGetParent()
        ?.setOptions({ tabBarVisible: options.visible });
    },
    [options.visible, navigation, navigationInfo],
  );

  React.useEffect(() => {
    const desiredVisiblity = isVisible === options.visible;

    if (desiredVisiblity && navigationInfo.hasPendingNavigation) {
      navigation.navigate(...(navigationInfo.args as any));
      navigationInfo.hasPendingNavigation = false;
    }
  }, [options.visible, isVisible, navigation, navigationInfo]);

  return navigate;
};
