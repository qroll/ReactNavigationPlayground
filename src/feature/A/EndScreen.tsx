import { useIsFocused } from '@react-navigation/native';
import { useCardAnimation } from '@react-navigation/stack';
import * as React from 'react';
import { Button, View, Text, StyleSheet, BackHandler } from 'react-native';
import { useNavigateAfterTabAnimation } from '../../useTabBarStatus';
import { withLogger } from '../../withLogger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 24,
    backgroundColor: '#fff',
  },
  topSection: {
    alignItems: 'center',
    padding: 24,
  },
  image: {
    backgroundColor: '#cab',
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 36,
  },
  header: { fontSize: 30, marginBottom: 16 },
  subtitle: { fontSize: 25, marginBottom: 16 },
  body: {
    fontSize: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#cad',
  },
});

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

  React.useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigateAfterTabAnimation('AStartScreen');
      return true;
    });

    return () => handler.remove();
  }, [navigateAfterTabAnimation]);

  const animation = useCardAnimation();

  React.useEffect(() => {
    const id = animation.swiping.addListener((progress) => {
      if (progress.value === 1) {
        navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false });
      }
    });
    return () => animation.swiping.removeListener(id);
  }, [animation.swiping]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.image} />
        <Text style={styles.header}>A End Screen</Text>
      </View>
      <Text style={styles.body}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec est eu
        nisi consectetur dignissim nec id erat. Phasellus mattis varius est quis
        viverra. Ut elementum fermentum pretium.
      </Text>
      <Text style={styles.body}>
        Etiam ullamcorper urna et elit lobortis, at suscipit sapien blandit.
        Suspendisse tempus, elit nec blandit accumsan, ex risus luctus magna,
        sed convallis nulla ante at sem. Duis eget neque viverra, varius diam
        non, tempor metus. Nulla euismod ex tellus, ut elementum nulla luctus
        ac.
      </Text>
      <Button title="Show modal" onPress={() => navigation.navigate('Modal')} />
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
