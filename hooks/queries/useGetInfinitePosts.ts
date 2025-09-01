import { getPosts } from "@/api/post";
import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getPosts(pageParam),
    queryKey: [queryKeys.POSTS, queryKeys.GET_POSTS],
    initialPageParam: 1,
    // 다음 페이지 파라미터 설정하기
    // lastPage: 현재 페이지의 게시글 리스트
    // allPages: 현재까지 가져온 모든 게시글 리스트
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1]; // 마지막 게시글 존재 여부 확인
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
};

export default useGetInfinitePosts;
