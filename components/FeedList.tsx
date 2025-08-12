import { FlatList, StyleSheet } from "react-native";

import FeedItem from "@/components/FeedItem";
import { colors } from "@/constants";

const FeedList = () => {
  const dummyList = [
    {
      id: 1,
      userId: 1,
      title: "더미 제목입니다.",
      description:
        "더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.",
      createdAt: "2025-01-01",
      author: {
        id: 1,
        nickname: "닉네임",
        imageUri: "",
      },
      imageUris: [],
      likes: [],
      hasVote: false,
      voteCount: 1,
      commentCount: 1,
      viewCount: 1,
    },
    {
      id: 2,
      userId: 1,
      title: "더미 제목입니다2.",
      description:
        "더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.",
      createdAt: "",
      author: {
        id: 1,
        nickname: "닉네임",
        imageUri: "",
      },
      imageUris: [],
      likes: [],
      hasVote: false,
      voteCount: 1,
      commentCount: 1,
      viewCount: 1,
    },
    {
      id: 3,
      userId: 1,
      title: "더미 제목입니다2.",
      description:
        "더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.",
      createdAt: "",
      author: {
        id: 1,
        nickname: "닉네임",
        imageUri: "",
      },
      imageUris: [],
      likes: [],
      hasVote: false,
      voteCount: 1,
      commentCount: 1,
      viewCount: 1,
    },
    {
      id: 4,
      userId: 1,
      title: "더미 제목입니다2.",
      description:
        "더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.",
      createdAt: "",
      author: {
        id: 1,
        nickname: "닉네임",
        imageUri: "",
      },
      imageUris: [],
      likes: [],
      hasVote: false,
      voteCount: 1,
      commentCount: 1,
      viewCount: 1,
    },
    {
      id: 5,
      userId: 1,
      title: "더미 제목입니다2.",
      description:
        "더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.",
      createdAt: "",
      author: {
        id: 1,
        nickname: "닉네임",
        imageUri: "",
      },
      imageUris: [],
      likes: [],
      hasVote: false,
      voteCount: 1,
      commentCount: 1,
      viewCount: 1,
    },
    {
      id: 6,
      userId: 1,
      title: "더미 제목입니다2.",
      description:
        "더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.",
      createdAt: "",
      author: {
        id: 1,
        nickname: "닉네임",
        imageUri: "",
      },
      imageUris: [],
      likes: [],
      hasVote: false,
      voteCount: 1,
      commentCount: 1,
      viewCount: 1,
    },
  ];

  return (
    <FlatList
      data={dummyList}
      renderItem={({ item }) => <FeedItem post={item} />}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => String(item.id)}
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
