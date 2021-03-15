import { createStore } from 'redux';

function tabReducer(state = { state: null }, action) {
  switch (action.type) {
    case 'nav':
      return { navState: action.navState };
    default:
      return state;
  }
}

export const store = createStore(tabReducer);
