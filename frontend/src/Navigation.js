import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Menu from "./componentes/home/Menu";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ListComponent from "./componentes/list/List";
import User from "./screen/User";
import Chat from "./screen/Chat";
import Pdf from "./screen/Pdf";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "#2196f3",
        tabBarInactiveTintColor: "#9e9e9e",
      }}
    >
      <Tab.Screen
        name="Página Principal"
        component={Menu}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={"Lisado de Perfiles"}
        component={ListComponent}
        options={{
          tabBarLabel: "Perfiles",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={"clipboard-list"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Usuarios"}
        component={User}
        options={{
          tabBarLabel: "Usuarios",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={"account"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"openIA"}
        component={Chat}
        options={{
          tabBarLabel: "openIA",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={"brain"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={"pdf"}
        component={Pdf}
        options={{
          tabBarLabel: "pdf",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={"file-pdf-box"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
