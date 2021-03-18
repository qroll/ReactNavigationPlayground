import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { useNavigateAfterTabAnimation } from '../../useTabBarStatus';
import { withLogger } from '../../withLogger';

function AEndScreen({ navigation, route }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd', (e) => {
      const isFocused = navigation.isFocused();
      if (isFocused) {
        navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true });
      }
    });

    return unsubscribe;
  }, [navigation]);

  const navigateAfterTabAnimation = useNavigateAfterTabAnimation({
    visible: false,
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>A End Screen</Text>
      <Button
        title="Go to A Screen 1"
        onPress={() => navigateAfterTabAnimation('AScreen1')}
      />
      <Button
        title="Go to A Start Screen"
        onPress={() => navigation.navigate('AStartScreen')}
      />
    </View>
  );
}

export default withLogger(AEndScreen);
