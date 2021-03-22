import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TabBarStatusContext } from './useTabBarStatus';

function TabBar(props) {
  const { setTabBarProps } = useContext(TabBarStatusContext);

  useEffect(() => {
    setTabBarProps(props);
  }, [props, setTabBarProps]);

  return null;
}

export default TabBar;
