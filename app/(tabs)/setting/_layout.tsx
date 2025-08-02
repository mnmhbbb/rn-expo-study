import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "white" } }}>
      <Stack.Screen name="index" options={{ headerShown: false, title: "설정" }} />
    </Stack>
  );
}
