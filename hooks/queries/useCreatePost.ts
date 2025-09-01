import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { createPost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";

const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace("/");
      queryClient.invalidateQueries({ queryKey: [queryKeys.POSTS, queryKeys.GET_POSTS] }); // 쿼리무효화
    },
  });
};

export { useCreatePost };
