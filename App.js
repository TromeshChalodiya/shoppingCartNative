import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';

import productReducer from './store/reducers/product';
import ShopNavigator from './navigation/ShopNavigator';

enableScreens();

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer);

const fetchFont = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
