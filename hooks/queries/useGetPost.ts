import { useQuery } from "@tanstack/react-query";

import { getPost } from "@/api/post";
import { queryKeys } from "@/constants";

const useGetPost = (id: number) => {
  return useQuery({
    queryFn: () => getPost(id),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id), // id가 존재할 때만 쿼리 실행
  });
};

export default useGetPost;
