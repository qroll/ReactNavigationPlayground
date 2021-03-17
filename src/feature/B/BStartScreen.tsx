import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from '../../withLogger';

function BStartScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>B Start Screen</Text>
      <Button
        title="Go to B Screen 1"
        onPress={() => {
          navigation.navigate('BScreen1');
        }}
      />
      <Button
        title="Go to B End Screen"
        onPress={() => navigation.push('BEndScreen')}
      />
    </View>
  );
}

export default withLogger(BStartScreen);
