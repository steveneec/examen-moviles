import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, Button } from "react-native";
import axios from "axios";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const getResultFromOpenApi = async () => {
    try {
      const response = await axios.post(
        "http://192.168.100.21:3000/openapi",
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = response.data;
      console.log(jsonData);
      setResult(
        `${jsonData.result} y los token utilizados fueron ${jsonData.token} `
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {"Ingrese El numero que desea convertir a binario"}
      </Text>
      <TextInput style={styles.input} value={prompt} onChangeText={setPrompt} />
      <Button title={"Enviar"} onPress={getResultFromOpenApi} />
      <Text style={styles.text}>{result}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Chat;
