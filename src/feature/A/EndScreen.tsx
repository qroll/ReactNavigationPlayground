import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { withLogger } from '../../withLogger';

function AEndScreen({ navigation, route }) {
  const showTabBar = React.useCallback(() => {
    navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true });
  }, [navigation]);

  useFocusEffect(showTabBar);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>A Screen 1</Text>
      <Button
        title="Go to A Start Screen"
        onPress={() => navigation.navigate('AStartScreen')}
      />
    </View>
  );
}

export default withLogger(AEndScreen);
