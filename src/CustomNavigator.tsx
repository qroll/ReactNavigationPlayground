import * as React from 'react';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  StackRouter,
} from '@react-navigation/native';
import { StackView } from '@react-navigation/stack';
import { CustomRouter, CustomTopRouter } from './CustomRouter';

function CustomNavigator({
  initialRouteName,
  children,
  screenOptions,
  ...rest
}) {
  const { state, descriptors, navigation } = useNavigationBuilder(
    CustomRouter,
    {
      initialRouteName,
      children,
      screenOptions,
    },
  );

  return (
    <StackView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

export const createCustomNavigator = createNavigatorFactory(CustomNavigator);

function CustomTopNavigator({
  initialRouteName,
  children,
  screenOptions,
  ...rest
}) {
  const { state, descriptors, navigation } = useNavigationBuilder(
    CustomTopRouter,
    {
      initialRouteName,
      children,
      screenOptions,
    },
  );

  return (
    <StackView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

export const createCustomTopNavigator = createNavigatorFactory(
  CustomTopNavigator,
);
