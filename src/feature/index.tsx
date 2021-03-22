import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { withLogger } from '../withLogger';

export function FeatureScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feature Tab</Text>
      <Button
        title="Go to Feature A"
        onPress={() =>
          navigation // stack
            .dangerouslyGetParent() // tab
            .dangerouslyGetParent() // common stack
            .push('AStartScreen')
        }
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
