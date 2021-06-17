// ./navigation/DrawerNavigator.js

import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { 
  HomeStackNavigator,
  LoginStackNavigator,
  RegisterStackNavigator,
  UpdateProfileStackNavigator

} from "./StackNavigator";

// import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Login" component={LoginStackNavigator} />
      <Drawer.Screen name="Register" component={RegisterStackNavigator} />
      <Drawer.Screen name="Update Profile" component={RegisterStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
	
