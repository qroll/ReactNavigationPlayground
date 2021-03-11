import { StackActions } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationRef } from './NavigationRef';
import { withLogger } from './withLogger';

function ModalScreen({ navigation, route }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.log('@@@ Modal pop!', route.params?.count);
      route.params?.dismiss?.();
      // NavigationRef.current?.dispatch(StackActions.popToTop());
      // navigation?.popToTop();
    }, 5000);
    return () => clearTimeout(timer);
    // NOTE: by right this should be empty? how to do that when props can change? are you supposed to use a separate useEffect?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, route.params]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Modal Screen</Text>
      <Text>{route.params?.count}</Text>
      <Button
        title="Open another modal"
        onPress={() =>
          navigation.push('Modal', { count: (route.params?.count || 0) + 1 })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop" onPress={() => navigation.pop()} />
    </View>
  );
}

export default withLogger(ModalScreen);
