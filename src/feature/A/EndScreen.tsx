import produce from 'immer';
import { nanoid } from 'nanoid/non-secure';
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
        onPress={() => navigation.navigate('AStartScreen')}
      />
      <Button
        title="Exit A"
        onPress={() => {
          const state = NavigationRef.current?.getRootState();

          const newState = produce(state, (draftState) => {
            const tabState = draftState?.routes[0].state;

            const phantomTab = tabState.routes[3];
            delete phantomTab.key;
            delete phantomTab.params;
            delete phantomTab.state;

            phantomTab.key = nanoid();

            tabState.index = 1;
          });

          console.log('@@@ BEFORE STATE', JSON.stringify(state));
          console.log('@@@ AFTER STATE', JSON.stringify(newState));

          NavigationRef.current?.resetRoot(newState);
        }}
      />
    </View>
  );
}

export default withLogger(AEndScreen);
