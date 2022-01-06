import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import ArticleScreen from '../screens/ArticleScreen'
import ClipScreen from '../screens/ClipScreen'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';

const Stack = createStackNavigator()
const BottomTab = createBottomTabNavigator();

const HomeStack = () => {
    return (
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options = {{ headerShown: false}} />
            <Stack.Screen name="Article" component={ArticleScreen} options = {{ headerShown: false}}/>
          </Stack.Navigator>
    );
}

const ClipStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Clip" component = {ClipScreen} options = {{ headerShown: false}} />
        </Stack.Navigator>
    )
}


const screenOption = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      let iconName;
      switch (route.name) {
        case 'Home':
          iconName = 'home';
          break;
        case 'Clip':
          iconName = 'ios-bookmarks';
          break;
      }
      return <Ionicons name name={iconName} size={size} color={color} />;
    },
  });

export default AppNavigator = () => {
    return (
        <NavigationContainer>
            <BottomTab.Navigator screenOptions = { screenOption }>
                <BottomTab.Screen name="Home" component = { HomeStack } />
                <BottomTab.Screen name="Clip" component = { ClipStack } />
            </BottomTab.Navigator>
        </NavigationContainer>
      );
  }
