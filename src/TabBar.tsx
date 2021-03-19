import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TabBarStatusContext } from './useTabBarStatus';

function TabBar({ state, descriptors, navigation }) {
  const { setVisible } = useContext(TabBarStatusContext);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    console.log('@@@ ANIMATE TAB BAR');
    if (focusedOptions.tabBarVisible) {
      console.log('@@@ SHOW');
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
      }).start(() => {
        setVisible(true);
      });
    } else {
      console.log('@@@ HIDE');
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
      }).start(() => {
        setVisible(false);
      });
    }
  }, [focusedOptions.tabBarVisible, setVisible, animation]);

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
      }}>
      {['Home', 'Features', 'Settings'].map((label) => {
        return (
          <View key={label} style={{ margin: 16, flex: 1 }}>
            <Text>{label}</Text>
          </View>
        );
      })}
    </Animated.View>
  );
}

export default TabBar;
