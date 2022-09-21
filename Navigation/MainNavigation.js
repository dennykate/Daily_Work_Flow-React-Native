import React from "react";
import { View, Text } from "react-native";

// import dependencies
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// import screens
import ProcessingScreen from "../Screens/ProcessingScreen";
import UploadedScreen from "../Screens/UploadedScreen";
import AddItemScreen from "../Screens/AddItemScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
      >
        <Stack.Screen name="MainScreen" component={BottomNavigation} />
        <Stack.Screen name="AddItemScreen" component={AddItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName == "ProcessingScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (routeName == "UploadedScreen") {
            iconName = focused ? "cloud-upload" : "cloud-upload-outline";
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          padding: 10,
          paddingBottom: 10,
          height: 60,
          backgroundColor: "#f5f5f5",
        },
        tabBarLabelStyle: {
          display: "none",
        },
      })}
    >
      <Tab.Screen
        name="ProcessingScreen"
        component={ProcessingScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="UploadedScreen"
        component={UploadedScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
