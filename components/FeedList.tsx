import { FlatList, StyleSheet } from "react-native";

import FeedItem from "@/components/FeedItem";
import { colors } from "@/constants";
import useGetInfinitePosts from "@/hooks/queries/useGetInfinitePosts";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";

const FeedList = () => {
  const {
    data: posts,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfinitePosts();

  const [isRefreshing, setIsRefreshing] = useState(false);

  // 홈 아이콘을 클릭하면, 리스트 스크롤 맨 위로 이동함
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => String(item.id)}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.WHITE,
    gap: 12,
  },
});

export default FeedList;
