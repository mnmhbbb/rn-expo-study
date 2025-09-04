import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { Link, router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: { backgroundColor: colors.WHITE },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          headerShown: true,
          title: "글쓰기",
          headerLeft: () => (
            <Link href={"/"} replace>
              <Feather name="arrow-left" size={28} color="black" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          headerShown: true,
          title: "글 수정",
          headerLeft: () => (
            <Link href={"/"} replace>
              <Feather name="arrow-left" size={28} color="black" onPress={() => router.back()} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => (
            <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}>
              <Feather name="arrow-left" size={28} color="black" onPress={() => router.back()} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
