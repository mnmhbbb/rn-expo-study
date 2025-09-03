import { useMutation } from "@tanstack/react-query";

import { updatePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";

const useUpdatePost = () => {
  return useMutation({
    mutationFn: updatePost,

    // (updatePost 함수의 반환값이 postId이니까)
    onSuccess: (postId) => {
      // 업데이트된 게시물 id 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [queryKeys.POST, queryKeys.GET_POST, postId] });
      // 게시물 리스트도 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [queryKeys.POSTS, queryKeys.GET_POSTS] });
    },
  });
};

export default useUpdatePost;
