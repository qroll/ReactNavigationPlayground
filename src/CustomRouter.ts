import { NavigationState } from '@react-navigation/native';
import { StackRouter } from '@react-navigation/native';
import produce from 'immer';
import { nanoid } from 'nanoid/non-secure';

export const CustomRouter = (options) => {
  const stackRouter = StackRouter(options);

  const router = {
    ...stackRouter,

    getStateForAction(state: NavigationState, action, options) {
      switch (action.type) {
        default:
          return stackRouter.getStateForAction(state, action, options);
      }
    },

    actionCreators: {
      ...stackRouter.actionCreators,
      navigateToFirstScreen: () => ({ type: 'NAVIGATE_TO_FIRST_SCREEN' }),
    },
  };

  return router;
};

export const CustomTopRouter = (options) => {
  const stackRouter = StackRouter(options);

  const router = {
    ...stackRouter,

    getStateForAction(state: NavigationState, action, options) {
      console.log('@@@ state', JSON.stringify(state));
      switch (action.type) {
        // case 'NAVIGATE_TO_FIRST_SCREEN': {
        //   // let's hard code this for now
        //   const lastScreenTab = state.routes[3];
        //   const firstScreenTab = state.routes[1];

        //   // combine them!
        //   const newState = {
        //     key: 'Tabs-123456789',
        //     name: 'Tabs',
        //     state: {
        //       stale: false,
        //       type: 'tab',
        //       key: nanoid(),
        //       index: 0,
        //       routeNames: ['Phantom'],
        //       history: [{ type: 'route', key: 'Phantom-123456789' }],
        //       routes: [
        //         {
        //           name: 'Phantom',
        //           key: 'Phantom-123456789',
        //           state: {
        //             stale: false,
        //             type: 'stack',
        //             key: 'stack-123456789',
        //             routeNames: [
        //               'HomeTab',
        //               'FeatureTab',
        //               'SettingsTab',
        //               'StartToDetails',
        //               'AStartScreen',
        //               'AEndScreen',
        //             ],
        //             index: 0,
        //             routes: [firstScreenTab, lastScreenTab],
        //           },
        //         },
        //       ],
        //     },
        //   };

        //   const newRootState = produce(state, (draft) => {
        //     draft.index = 2;
        //     draft.routes.splice(1, 1);
        //     draft.routes.splice(2, 1);
        //     draft.routes.push(newState);
        //   });

        //   console.log('@@@ newRootState', newRootState);

        //   return newRootState;
        // }

        default: {
          const newRootState = stackRouter.getStateForAction(
            state,
            action,
            options,
          );
          console.log('@@@ newRootState', JSON.stringify(newRootState));

          return newRootState;
        }
      }
    },

    actionCreators: {
      ...stackRouter.actionCreators,
      navigateToFirstScreen: () => ({ type: 'NAVIGATE_TO_FIRST_SCREEN' }),
    },
  };

  return router;
};
