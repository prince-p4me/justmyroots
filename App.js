import React from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from './src/screens/dashboard';
import LoginScreen from './src/screens/login';
import OtpScreen from './src/screens/otp';
import RegisterScreen from './src/screens/register';
import Splash from './src/splash';
import Constants from "./src/constant"

const AppStack = createStackNavigator({
  Home: DashboardScreen
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  OTP: OtpScreen,
  Register: RegisterScreen
});

const Navigations = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Splash,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={Constants.theme}></StatusBar>
        <SafeAreaView style={{ backgroundColor: Constants.theme }}></SafeAreaView>
        <Navigations />
      </View>
    )
  }
}