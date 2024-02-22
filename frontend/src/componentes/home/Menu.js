import React from "react";
import { View, Text } from "react-native";
import ProfileCard from "./ProfileCard";

const Menu = () => {
  return (
    <View>
      <ProfileCard />
      <Text style={{ textAlign: "center", marginTop: 10 }}>
      Steven Erraez - Universidad Central del Ecuador
      </Text>
    </View>
  );
};

export default Menu;
