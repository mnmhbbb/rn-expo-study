import CustomButton from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import { useCreatePost } from "@/hooks/queries/useCreatePost";
import { ImageUri } from "@/types";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
};

export default function PostWriteScreen() {
  const navigation = useNavigation();
  const createPostMutation = useCreatePost();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    createPostMutation.mutate(data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="medium"
          variant="standard"
          onPress={postForm.handleSubmit(onSubmit)}
        />
      ),
    });
  }, []);

  return (
    // 키보드가 인풋창을 가릴 경우
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <FormProvider {...postForm}>
        <TitleInput />
        <DescriptionInput />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
