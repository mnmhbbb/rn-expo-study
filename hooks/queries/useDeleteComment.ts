import { deleteComment } from "@/api/comment";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.POST, queryKeys.GET_POST, postId] });
    },
  });
};

export default useDeleteComment;
