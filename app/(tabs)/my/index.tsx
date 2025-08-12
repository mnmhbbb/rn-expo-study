import { router, useFocusEffect } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function MyScreen() {
  // TODO: 로그인 여부에 따라 적용하기
  useFocusEffect(() => {
    router.replace("/auth");
  });

  return (
    <SafeAreaView>
      <Text>내 정보</Text>
    </SafeAreaView>
  );
}
