import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './Views/Screens/HomeScreen';
import FavoriteScreen from './Views/Screens/FavoriteScreen';
import UserScreen from './Views/Screens/UserScreen';
import MangaInfoScreen from './Views/Screens/MangaInfoScreen';
import MangaScreen from './Views/Screens/MangaScreen';
import History from './Views/Screens/HistoryScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: '#161B21',
    card: '#161B21',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(10, 10, 10)',
    notification: 'rgb(255, 69, 58)',
  },
};

const Stack = createStackNavigator();

function HomeScreen_main({ navigation, route }) {
  if (route.state && route.state.index > 0)
    navigation.setOptions({ tabBarVisible: false });
  else
    navigation.setOptions({ tabBarVisible: true });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, tabBarVisible: true }} theme={ MyTheme }>
      <Stack.Screen name="Home" component={ HomeScreen }/>
      <Stack.Screen name="MangaInfo" component={ MangaInfoScreen } options={{ headerShown: true }}/>
      <Stack.Screen name="MangaScreen" component={ MangaScreen }/>
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
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
            case "History":
              iconName = 'history';
              break;
            default:
          }

          return <MaterialIcons name={iconName} size={24} color={iconColor}/>;
        },
      })}

      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name="Home" component={ HomeScreen_main }/>
        <Tab.Screen name="FavoriteScreen" component={ FavoriteScreen }/>
        <Tab.Screen name="History" component={ History }/>
        <Tab.Screen name="Profile" component={ UserScreen }/>
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
