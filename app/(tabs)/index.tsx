import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Home</Text>
      </View>
      <CustomButton label="버튼" onPress={() => {}} />
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
