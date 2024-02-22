import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import * as ExpoDocumentPicker from "expo-document-picker";
import axios from "axios"; // Importar Axios
import * as Device from "expo-device";

const Pdf = () => {
  const [pdfDoc, setPdfDoc] = useState();
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");

  const handleFilePicker = async () => {
    let result = await ExpoDocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: true,
      type: "*/*"
    });

    console.log(result);
    setPdfDoc(Device.osName === "Windows" ? result.file : result.uri);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("question", question);
      if (Device.osName === "Windows") {
        formData.append("file", pdfDoc);
      } else {
        formData.append("file", {
          uri: pdfDoc,
          type: "application/pdf",
          name: "test.pdf",
        });
      }

      const response = await axios.post(
        "http://192.168.100.21:3000/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        setQuestion("");
        setResult(response.data.text);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <View>
      <Button title={"Select PDF"} onPress={handleFilePicker} />
      <TextInput
        style={styles.input}
        value={question}
        onChangeText={setQuestion}
        placeholder={"Ingresa tu pregunta"}
      />
      <Button title={"send"} onPress={handleUpload} />
      <Text>{result}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
export default Pdf;
