import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './Views/HomeScreen';
import FavoriteScreen from './Views/FavoriteScreen';
import UserScreen from './Views/UserScreen';
import MangaInfoScreen from './Views/MangaInfoScreen';
import MangaScreen from './Views/MangaScreen';

const Stack = createStackNavigator();

function HomeScreen_main() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ HomeScreen }/>
      <Stack.Screen name="MangaInfo" component={ MangaInfoScreen }/>
      <Stack.Screen name="MangaScreen" component={ MangaScreen }/>
    </Stack.Navigator>
  );
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
        <Tab.Screen name="Home" component={ HomeScreen_main } />
        <Tab.Screen name="FavoriteScreen" component={ FavoriteScreen } />
        <Tab.Screen name="Profile" component={ UserScreen } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
