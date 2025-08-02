import { router } from "expo-router";
import { useState } from "react";
import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [text, setText] = useState("");

  const handleSave = () => {
    console.log(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Home</Text>
      </View>
      <TextInput value={text} onChangeText={setText} style={styles.input} />
      <Button title="Save" onPress={handleSave} />
      <Pressable onPress={() => router.push("/setting")}>
        <Text>Go to Setting</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    borderColor: "black",
    padding: 10,
    color: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    marginTop: 20,
  },
});
