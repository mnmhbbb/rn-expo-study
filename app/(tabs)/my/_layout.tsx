import { Stack } from "expo-router";

export default function MyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "white" } }}>
      <Stack.Screen name="index" options={{ headerShown: false, title: "내 정보" }} />
    </Stack>
  );
}
