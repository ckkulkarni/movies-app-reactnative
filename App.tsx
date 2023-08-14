import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import Base from './Apps/Base';
import Details from './Apps/Details';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
function App(): JSX.Element {
  const stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name="Home" component={Base} />
          <stack.Screen name="Details" component={Details} />
        </stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
