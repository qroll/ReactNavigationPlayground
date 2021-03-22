import { useNavigation } from '@react-navigation/native';
import EventEmitter from 'eventemitter3';
import React, { useCallback, useContext, useRef, useState } from 'react';

interface TabBarStatus {
  show: boolean;
  setShow: (show: boolean) => void;
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  tabBarProps: any;
  setTabBarProps: (props: any) => void;
  eventEmitter: EventEmitter;
}

export const TabBarStatusContext = React.createContext<TabBarStatus>({
  show: true,
  setShow: () => {},
  isVisible: true,
  setVisible: () => {},
  tabBarProps: {},
  setTabBarProps: () => {},
  eventEmitter: new EventEmitter(),
});

export const useIsTabBarVisible = () => {
  const value = useContext(TabBarStatusContext);
  return value.isVisible;
};

export const useSetTabBarVisible = () => {
  const value = useContext(TabBarStatusContext);
  return value.setShow;
};

export const useTabBarProps = () => {
  const value = useContext(TabBarStatusContext);
  return value.tabBarProps;
};

export const useEventEmitter = () => {
  const value = useContext(TabBarStatusContext);
  return value.eventEmitter;
};

export const TabBarStatusProvider = ({ children }) => {
  const [show, setShow] = useState(true);
  const [isVisible, setVisible] = useState(true);
  const [tabBarProps, setTabBarProps] = useState({});
  const eventEmitter = useRef(new EventEmitter()).current;

  return (
    <TabBarStatusContext.Provider
      value={{
        show,
        setShow,
        isVisible,
        setVisible,
        tabBarProps,
        setTabBarProps,
        eventEmitter,
      }}>
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

      // setTabBarVisible(options.visible);
      navigation
        .dangerouslyGetParent()
        .setOptions({ tabBarVisible: options.visible });
    },
    [options.visible, navigationArgs, setTabBarVisible],
  );

  React.useEffect(() => {
    const desiredVisiblity = isVisible === options.visible;

    if (desiredVisiblity && hasPendingNavigation) {
      if (typeof navigationArgs.current[0] === 'function') {
        navigationArgs.current[0]();
      } else {
        navigation.navigate(...(navigationArgs.current as any));
      }

      setPendingNavigation(false);
    }
  }, [options.visible, isVisible, navigation, hasPendingNavigation]);

  return navigate;
};
