
import {Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { CustomDrawerContent} from './src'
import {HomeScreen, WorldScreen} from './src/tab'
import {ProfilScreen} from './src/drawer'
import {RegisterScreen, LoginScreen} from './src/auth'
import {IMAGE} from './src/constants/Image'
import React, {useEffect} from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator()

function HomeStack() {
 
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler}/>
      
    </StackHome.Navigator>
  )
}

const StackWorld = createStackNavigator()

function WorldStack() {
    return (
    <StackWorld.Navigator initialRouteName="World">
      <StackWorld.Screen name="World" component={WorldScreen} options={navOptionHandler}/>
    
    </StackWorld.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? IMAGE.ICON_HOME
                : IMAGE.ICON_HOME_BLACK;
            } else if (route.name === 'World') {
              iconName = focused ? 
              IMAGE.ICON_SETTINGS 
              : IMAGE.ICON_SETTINGS_BLACK;
            }

            // You can return any component that you like here!
            return <Image source={iconName} style={{width: 20, height: 20}} 
            resizeMode="contain"/>;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'black',
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="World" component={WorldStack} />
      </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="Haberler" 
      drawerContent={() => <CustomDrawerContent navigation={navigation}/>}>
        <Drawer.Screen name="Haberler" component={TabNavigator} />
        <Drawer.Screen name="Profil" component={ProfilScreen} />
    </Drawer.Navigator>
  )
}



export default function App() {
  useEffect(() => {
    registerForPushNotification().then(token=>console.log(token)).catch(err=>console.log(Err))
   
  }, [])

  async function registerForPushNotification(){
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status != 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      // finalStatus = status;
    }
    if (status !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token
  }
  
  const StackApp = createStackNavigator()
  return (
    <NavigationContainer>
        <StackApp.Navigator initialRouteName="Login">
          <StackApp.Screen name="HomeApp" component={DrawerNavigator} options={navOptionHandler}/>
          <StackApp.Screen name="Login" component={LoginScreen} options={navOptionHandler}/>
          <StackApp.Screen name="Register" component={RegisterScreen} options={navOptionHandler}/>
        </StackApp.Navigator>
    </NavigationContainer>
  );
}