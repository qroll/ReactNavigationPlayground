import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { CommonActions, StackActions } from '@react-navigation/native';
import { withLogger } from './withLogger';
import { NavigationRef } from './NavigationRef';
import { produce } from 'immer';

function DetailsScreen({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Tabs', { screen: 'HomeTab' })}
      />
      <Button
        title="Go to Options"
        onPress={() => navigation.push('Option', { itemId: 32 })}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop" onPress={() => navigation.pop()} />
      <Button title="Reset" onPress={() => console.log('????')} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />

      <Button
        title="Open modal"
        onPress={() =>
          navigation.navigate('Modal', {
            dismiss: () =>
              NavigationRef.current?.reset({
                index: 0,
                routes: [{ name: 'Maintenance' }],
              }),
            // dismiss: () => NavigationRef.current?.navigate('Maintenance'),
            // NavigationRef.current?.dispatch(StackActions.popToTop()),
          })
        }
      />
      <Button
        title="Go to Settings"
        onPress={() => {
          navigation.navigate('SettingsTab', {
            screen: 'Option',
            params: { itemId: 3, otherParam: 'From settings' },
            initial: false,
          });

          // const state = NavigationRef.current?.getRootState();
          // const newState = produce(state, (draft) => {
          //   const tabStackState = draft?.routes[0].state;

          //   const settingStackIndex = tabStackState?.routes?.findIndex(
          //     (route) => route.name === 'Settings',
          //   );

          //   const settingStackState =
          //     tabStackState?.routes?.[settingStackIndex].state;

          //   tabStackState.index = settingStackIndex;

          //   console.log(
          //     '@@@ STATE',
          //     JSON.stringify(tabStackState?.routes?.[settingStackIndex]),
          //   );

          //   settingStackState.index = 1;
          //   settingStackState.routes = [
          //     {
          //       name: 'Settings',
          //     },
          //     {
          //       name: 'Option',
          //       params: { itemId: 3, otherParam: 'From settings' },
          //     },
          //   ];
          // });

          // NavigationRef.current?.reset(newState);
        }}
      />
    </View>
  );
}

export default withLogger(DetailsScreen);
