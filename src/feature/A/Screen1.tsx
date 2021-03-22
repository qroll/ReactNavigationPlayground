import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text, StyleSheet, ScrollView } from 'react-native';
import { withLogger } from '../../withLogger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  header: { fontSize: 30, marginBottom: 16 },
  subtitle: { fontSize: 25, marginBottom: 16 },
  body: { fontSize: 16, marginBottom: 16 },
});

function AScreen1({ navigation, route }) {
  const showTabBar = React.useCallback(() => {
    navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false });
  }, [navigation]);

  useFocusEffect(showTabBar);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>A Screen 1</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec est eu
        nisi consectetur dignissim nec id erat. Phasellus mattis varius est quis
        viverra. Ut elementum fermentum pretium.
      </Text>
      <Text style={styles.body}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec est eu
        nisi consectetur dignissim nec id erat. Phasellus mattis varius est quis
        viverra. Ut elementum fermentum pretium. Vivamus non mattis purus, ut
        mollis mi.
      </Text>
      <Text style={styles.body}>
        Etiam ullamcorper urna et elit lobortis, at suscipit sapien blandit.
        Suspendisse tempus, elit nec blandit accumsan, ex risus luctus magna,
        sed convallis nulla ante at sem. Duis eget neque viverra, varius diam
        non, tempor metus. Nulla euismod ex tellus, ut elementum nulla luctus
        ac. Aliquam consequat turpis purus, in sagittis elit elementum ut. Duis
        vel nisi arcu. Integer non dolor volutpat nunc ultrices sodales. Fusce
        non mauris quis justo consectetur molestie. Donec magna elit, finibus
        nec ex at, lobortis molestie tortor. Praesent tristique, urna sed auctor
        egestas, ante lorem ultricies nulla, placerat posuere quam purus a
        lacus.
      </Text>
      <Button title="Show modal" onPress={() => navigation.navigate('Modal')} />
      <Button
        title="Go to A End Screen"
        onPress={() => navigation.navigate('AEndScreen')}
      />
    </ScrollView>
  );
}

export default withLogger(AScreen1);
