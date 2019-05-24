import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomeScreen from "./Screens/Home";
import WelcomeScreen from "./Screens/Welcome"
import { createStackNavigator, createAppContainer } from "react-navigation";


const allScreens = createStackNavigator (
  {
  Home: HomeScreen,
  Welcome: WelcomeScreen,
  },

  {
    initialRouteName: "Home" /*The name of the key */
  }
)

export default createAppContainer(allScreens);
