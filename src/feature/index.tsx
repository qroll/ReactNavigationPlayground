import * as React from 'react';
import { Button, Text, View } from 'react-native';
import {
  useEventEmitter,
  useNavigateAfterTabAnimation,
} from '../useTabBarStatus';
import { withLogger } from '../withLogger';

export function FeatureScreen({ navigation }) {
  /** TAB BAR CODE */

  const navigateAfterTabAnimation = useNavigateAfterTabAnimation({
    visible: false,
  });

  const eventEmitter = useEventEmitter();

  React.useEffect(() => {
    eventEmitter.addListener('exitEvent', () => {
      console.log('@@@ GOT EXIT EVENT');
      navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true });
    });
    return () => eventEmitter.removeAllListeners();
  }, [navigation, eventEmitter]);

  /** END TAB BAR CODE */

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feature Tab</Text>
      <Button
        title="Go to Feature A"
        onPress={() => {
          navigateAfterTabAnimation(() => {
            navigation // stack
              .dangerouslyGetParent() // tab
              .dangerouslyGetParent() // common stack
              .push('AStartScreen');
          });
        }}
      />
      <Button
        title="Go to Feature B"
        onPress={() =>
          navigation // stack
            .dangerouslyGetParent() // tab
            .dangerouslyGetParent() // common stack
            .push('BStartScreen')
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop" onPress={() => navigation.pop()} />
    </View>
  );
}

export default withLogger(FeatureScreen);
