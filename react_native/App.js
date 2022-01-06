import React from 'react';
import AppNavigator from './navigation/AppNavigator'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import store, {persistor} from './store'


export default function App() {
  return (
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  )
}
