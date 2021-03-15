import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';

export const withLogger = (Component, options?) => (props) => {
  // console.log(
  //   `@@@ ${Component.name} => ${JSON.stringify(props.route.params, null, 2)}`,
  // );
  React.useEffect(() => {
    console.log(`@@@ ${Component.name} mounted`);
    () => console.log(`@@@ ${Component.name} unmounted`);
  }, []);

  return <Component {...props} />;
};
