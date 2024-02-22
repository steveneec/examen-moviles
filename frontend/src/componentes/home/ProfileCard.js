import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const github = <Icon name={"github"} size={30} color={"#2196f3"} />;
const facebook = <Icon name={"twitch"} size={30} color={"#2196f3"} />;
const youtube = <Icon name={"youtube"} size={30} color={"#2196f3"} />;
const reddit = <Icon name={"reddit"} size={30} color={"#2196f3"} />;
const linkedin = <Icon name={"linkedin"} size={30} color={"#2196f3"} />;
const steam = <Icon name="steam" size={30} color={"#2196f3"}/>
//const kwai = <Icon name={"kwai"} size={30} color={"#2196f3"}/>

const ProfileCard = () => {
  const user = {
    avatar: require(
      "../../resources/images/profile.jpeg"),
    coverPhoto:
      require("../../resources/images/bg.png"),
    name: "Steven Erraez",
  };

  return (
    <View style={styles.container}>
      <Image source={user.coverPhoto} style={styles.coverPhoto} />
      <View style={styles.avatarContainer}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback
          style={{ color: "black" }}
          onPress={() => {
            Linking.openURL("https://www.twitch.tv/soyestib");
          }}
        >
          {facebook}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={{ color: "blue" }}
          onPress={() => {
            Linking.openURL("https://github.com/steveneec");
          }}
        >
          {github}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={{ color: "blue" }}
          onPress={() => {
            Linking.openURL("https://steamcommunity.com/id/bootlegsteve/");
          }}
        >
          {steam}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => Linking.openURL("https://www.reddit.com/user/steveneec/")}
        >
          {reddit}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL(
              "https://www.linkedin.com/in/steven-erraez-calder%C3%B3n-912505124/"
            )
          }
        >
          {linkedin}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL(
              "https://www.kwai.com/es"
            )
          }
        >
          <Image source={require("../../resources/images/icons/kwai.png")} style={{width: 30, height: 30}}/>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    alignItems: "center", //flex y grid
  },
  coverPhoto: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -75,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: "#2196f3",
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "60%",
    justifyContent: "space-between",
  },
});
export default ProfileCard;
