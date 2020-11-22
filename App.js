import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './Views/HomeScreen';
import FavoriteScreen from './Views/FavoriteScreen';

function HomeScreen_f() {

  return (<HomeScreen></HomeScreen>);
}

function FavoriteScreen_f() {
  return (<FavoriteScreen></FavoriteScreen>);
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused
          ? 'tomato'
          : 'gray';

          switch (route.name) {
            case "Home":
              iconName ='home';
              break;
            case "FavoriteScreen":
              iconName = 'favorite';
              break;
            default:
          }

          return <MaterialIcons name={iconName} size={24} color={iconColor}/>;
        },
      })}

      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      
      >
        <Tab.Screen name="Home" component={ HomeScreen_f } />
        <Tab.Screen name="FavoriteScreen" component={ FavoriteScreen_f } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
