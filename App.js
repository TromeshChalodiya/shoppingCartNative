import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import productReducer from './store/reducers/product';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
