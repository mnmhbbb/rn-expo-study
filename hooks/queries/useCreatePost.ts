import { createPost } from "@/api/post";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace("/");
    },
  });
};

export { useCreatePost };
