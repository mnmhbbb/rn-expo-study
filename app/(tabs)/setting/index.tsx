import { SafeAreaView, Text } from "react-native";

import AuthRoute from "@/components/AuthRoute";

export default function SettingScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>설정</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
