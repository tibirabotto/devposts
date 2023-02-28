import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from "react-native-vector-icons/Feather";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import NewPost from "../pages/NewPost";
import PostsUser from "../pages/PostsUser";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          headerTintColor: "#FFF",
          headerStyle: {
            backgroundColor: "#36363F",
          },
        }}
      />
      <Stack.Screen
        name="PostsUser"
        component={PostsUser}
        options={{
          headerTintColor: "#FFF",
          headerStyle: {
            backgroundColor: "#36363F",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarKeyboardHidesTabBar: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#202225",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#FFF",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Feather name="search" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default AppRoutes;
