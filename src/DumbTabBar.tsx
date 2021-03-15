import {
  CommonActions,
  StackActions,
  TabActions,
} from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity, Easing } from 'react-native';
import { connect } from 'react-redux';
import { NavigationRef } from './NavigationRef';

const getNestedScreen = (state) => {
  if (!state) {
    return null;
  }

  if (state.state) {
    return getNestedScreen(state.state);
  }
  if (state.routes) {
    return getNestedScreen(state.routes[state.index]);
  }
  return state.name;
};

function TabBar({ navState }) {
  const animation = useRef(new Animated.Value(0)).current;
  const hideStatus = useRef(false);

  useEffect(() => {
    const currentScreen = getNestedScreen(navState);
    const shouldHide = ['AScreen1'].includes(currentScreen);

    if (!hideStatus.current && shouldHide) {
      console.log('@@@ bye');

      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      console.log('@@@ hi');

      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    hideStatus.current = shouldHide;
  }, [navState, animation]);

  if (!navState) {
    return null;
  }

  // if (['AScreen1'].includes(currentScreen)) {
  //   return null;
  // }

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        height: 80,
        backgroundColor: 'green',
        transform: [
          {
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -1000],
            }),
          },
        ],
      }}>
      {['HomeTab', 'FeatureTab', 'SettingsTab'].map((label, index) => {
        const onPress = () => {
          NavigationRef.current?.dispatch(CommonActions.navigate(label));
        };

        const onLongPress = () => {};

        return (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={index}>
            <Text
              style={{
                color: '#222',
                textAlign: 'center',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const mapStateToProps = (state) => {
  console.log('@@@ state', state);
  return {
    navState: state.navState,
  };
};

export default connect(mapStateToProps)(TabBar);
