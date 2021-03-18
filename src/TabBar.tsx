import { BottomTabBar } from '@react-navigation/bottom-tabs';
import produce from 'immer';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity, Easing } from 'react-native';

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  console.log('@@@ I LIKE PIE', focusedOptions);

  const animation = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    console.log('@@@ ANIMATE TAB BAR');
    if (focusedOptions.tabBarVisible) {
      console.log('@@@ SHOW');
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
      }).start(() => {
        if (focusedOptions.deferred) {
          focusedOptions.deferred.resolve();
        }
      });
    } else {
      console.log('@@@ HIDE');
      Animated.timing(animation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        if (focusedOptions.deferred) {
          focusedOptions.deferred.resolve();
        }
      });
    }
  }, [focusedOptions, animation]);

  return (
    <Animated.View
      style={{
        backgroundColor: 'green',
        flexDirection: 'row',
        height: 50,
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1000, 0],
            }),
          },
        ],
      }}>
      <Text>LALALALALA</Text>
    </Animated.View>
  );
}

export default TabBar;
