import { CommonActions } from '@react-navigation/native';
import produce from 'immer';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationRef } from '../../NavigationRef';
import { withLogger } from '../../withLogger';

function AEndScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>A Screen 1</Text>
      <Button
        title="Go to A Start Screen"
        onPress={() => {
          // merge screen
          const state = NavigationRef.current?.getRootState();

          console.log('@@@ BEFORE STATE', JSON.stringify(state));

          const newState = produce(state, (draftState) => {
            const secondTab = draftState.routes[1].state;
            const secondPhantomStack = secondTab?.routes[0].state;
            const lastTab = draftState.routes[3].state;
            const lastPhantomStack = lastTab?.routes[0].state;

            secondPhantomStack.routes = [
              ...secondPhantomStack.routes,
              ...lastPhantomStack.routes,
            ];
            secondPhantomStack.index = 0;

            draftState.routes.splice(3, 1);
            draftState.routes.splice(1, 1);
            draftState.routes.push(secondTab);
            draftState.index = 2;
          });

          console.log('@@@ AFTER STATE', JSON.stringify(newState));

          NavigationRef.current?.resetRoot(newState);
        }}
      />
    </View>
  );
}

export default withLogger(AEndScreen);
