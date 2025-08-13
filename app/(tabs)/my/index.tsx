import { SafeAreaView, Text } from "react-native";

import AuthRoute from "@/components/AuthRoute";

export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>내 정보</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
