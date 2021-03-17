import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from '../../withLogger';

function BEndScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>B End Screen</Text>
      <Button
        title="Go to B Start Screen"
        onPress={() => navigation.navigate('BStartScreen')}
      />
      <Button
        title="Leave Feature B"
        onPress={() => {
          navigation.navigate('BStartScreen');
          navigation.goBack();
        }}
      />
    </View>
  );
}

export default withLogger(BEndScreen);
