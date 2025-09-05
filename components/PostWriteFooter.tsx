import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/constants";
import useUploadImages from "@/hooks/queries/useUploadImages";
import { getFormDataImages } from "@/utils/image";
import { useFormContext, useWatch } from "react-hook-form";

const PostWriteFooter = () => {
  const inset = useSafeAreaInsets();
  const uploadImages = useUploadImages();
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: ["imageUris"] }); // PostWriteScreen postForm의 imageUris

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert("이미지 개수 초과", "최대 5개의 이미지만 추가할 수 있습니다.");
      return;
    }
    // 이미지를 더 추가할 경우, 기존 이미지 imageUris에다가 새로 선택된 이미지 추가
    setValue("imageUris", [...imageUris, ...uris.map((uri) => ({ uri: uri }))]);
  };

  const handleOpenImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true, // 여러 이미지 선택 가능
    });

    if (result.canceled) return;

    const formData = getFormDataImages("images", result.assets);
    uploadImages.mutate(formData, {
      onSuccess: (data: string[]) => {
        // 뮤테이션에서 응답 받은 이미지 uri를 폼에 추가
        console.log("data", data);
        addImageUris(data);
      },
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePick}>
        <Ionicons name="camera" size={20} color={colors.GRAY_500} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    flexDirection: "row",
    gap: 10,
  },
  footerIcon: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.GRAY_100,
  },
});

export default PostWriteFooter;
