import { TabActions } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationRef } from './NavigationRef';

const getNestedScreen = (state) => {
  if (state.state) {
    return getNestedScreen(state.state);
  }
  if (state.routes) {
    return getNestedScreen(state.routes[state.index]);
  }
  return state.name;
};

function TabBar({ navState }) {
  if (!navState) {
    return null;
  }

  const currentScreen = getNestedScreen(navState);
  console.log('@@@ currentScreen', currentScreen);

  if (['AScreen1'].includes(currentScreen)) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', height: 40 }}>
      {['HomeTab', 'FeatureTab', 'SettingsTab'].map((label, index) => {
        const onPress = () => {
          NavigationRef.current?.dispatch(TabActions.jumpTo(label));
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
    </View>
  );
}

const mapStateToProps = (state) => {
  console.log('@@@ state', state);
  return {
    navState: state.navState,
  };
};

export default connect(mapStateToProps)(TabBar);
