import { TabActions } from '@react-navigation/native';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { NavigationRef } from './NavigationRef';
import { TabBarStatusContext } from './useTabBarStatus';

export function CustomTabBar() {
  const { show: tabBarVisible, setVisible } = useContext(TabBarStatusContext);

  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (tabBarVisible) {
      console.log('@@@ SHOW TAB BAR');
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
      }).start(() => {
        setVisible(true);
      });
    } else {
      console.log('@@@ HIDE TAB BAR');
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
      }).start(() => {
        setVisible(false);
      });
    }
  }, [tabBarVisible, setVisible, animation]);

  return (
    <Animated.View
      style={{
        backgroundColor: '#bdb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Animated.interpolate(animation, {
          inputRange: [0, 1],
          outputRange: [0, 80],
        }),
        // opacity: animation
      }}>
      {['FeatureTab', 'HomeTab', 'SettingsTab'].map((label, index) => {
        const onPress = () => {
          NavigationRef.current?.dispatch(TabActions.jumpTo(label));
        };

        return (
          <TouchableOpacity
            key={label}
            onPress={onPress}
            style={{ margin: 16, flex: 1 }}>
            <Text style={{ color: '#222' }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}
