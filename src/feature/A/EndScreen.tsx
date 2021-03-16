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
            const firstTab = draftState.routes[0].state;
            const firstPhantomStack = firstTab?.routes[0].state;
            const lastTab = draftState.routes[2].state;
            const lastPhantomStack = lastTab?.routes[0].state;

            // lastPhantomStack.routes = [
            //   ...firstPhantomStack.routes,
            //   // ...lastPhantomStack.routes,
            // ];
            // lastPhantomStack.index = lastPhantomStack.routes.length - 1;

            firstPhantomStack.routes = [
              ...firstPhantomStack.routes,
              ...lastPhantomStack.routes,
            ];
            firstPhantomStack.index = firstPhantomStack.routes.length - 1;

            draftState.routes.splice(2, 1);
            draftState.routes.splice(0, 1);
            draftState.routes.push(firstTab);
            draftState.index = 1;
          });

          console.log('@@@ AFTER STATE', JSON.stringify(newState));

          NavigationRef.current?.resetRoot(newState);

          // pop
          // NavigationRef.current?.goBack();
        }}
      />
    </View>
  );
}

export default withLogger(AEndScreen);
