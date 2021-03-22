import { useCardAnimation } from '@react-navigation/stack';
import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  BackHandler,
  ScrollView,
} from 'react-native';
import {
  useEventEmitter,
  useNavigateAfterTabAnimation,
  useSetTabBarVisible,
} from '../../useTabBarStatus';
import { withLogger } from '../../withLogger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
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
  const eventEmitter = useEventEmitter();
  const shouldEmitEvent = React.useRef(false);

  React.useEffect(() => {
    const id = navigation.addListener('transitionEnd', () => {
      const isFocused = navigation.isFocused();
      if (!isFocused && shouldEmitEvent.current) {
        eventEmitter.emit('exitEvent');
      }
    });
    return () => navigation.removeListener(id);
  }, [navigation, eventEmitter]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
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
        onPress={() => navigation.navigate('AScreen1')}
      />
      <Button
        title="Go to A Start Screen"
        onPress={() => navigation.navigate('AStartScreen')}
      />
      <Button
        title="Exit A"
        onPress={() => {
          shouldEmitEvent.current = true;
          navigation.navigate('AStartScreen');
          navigation.goBack();
        }}
      />
    </ScrollView>
  );
}

export default withLogger(AEndScreen);
