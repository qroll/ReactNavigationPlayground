import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { NavigationRef } from './NavigationRef';
import TabBar from './DumbTabBar';

export const withNavAwareTabBar = (Component, options?) => (props) => {
  return (
    <>
      <Component {...props} />
      <TabBar />
    </>
  );
};
