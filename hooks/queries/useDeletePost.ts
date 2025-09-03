import { useMutation } from "@tanstack/react-query";

import { deletePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";

const useDeletePost = () => {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.POSTS, queryKeys.GET_POSTS] });
    },
  });
};

export { useDeletePost };
