import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './Views/HomeScreen';
import FavoriteScreen from './Views/FavoriteScreen';
import UserScreen from './Views/UserScreen';

function HomeScreen_f() {

  return (<HomeScreen></HomeScreen>);
}

function FavoriteScreen_f() {
  return (<FavoriteScreen></FavoriteScreen>);
}

function UserScreen_f() {
  return (<UserScreen></UserScreen>);
}

const Tab = createBottomTabNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#161B21',
    card: '#161B21',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
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
            case "Profile":
              iconName = 'person';
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
        <Tab.Screen name="Profile" component={ UserScreen_f } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
