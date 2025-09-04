import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import useCreateComment from "@/hooks/queries/useCreateComment";
import useGetPost from "@/hooks/queries/useGetPost";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();

  const { data: post, isPending, isError } = useGetPost(Number(id));
  const createComment = useCreateComment();

  const [content, setContent] = useState("");
  const scrollRef = useRef<ScrollView | null>(null);

  if (isPending || isError) {
    return <></>;
  }

  const handleSubmitComment = () => {
    const commentData = { content, postId: Number(id) };
    createComment.mutate(commentData);
    setContent("");

    // 댓글 등록 후 스크롤 맨 아래로 이동
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 500);
  };

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.awareScrollViewContainer}>
          <ScrollView
            ref={scrollRef}
            style={{ marginBottom: 75 }}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail />
              <Text style={styles.commentCount}>댓글 {post.commentCount}개</Text>
            </View>

            {/* 댓글 목록 */}
            {post.comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              value={content}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
              placeholder="댓글을 입력해주세요."
              onChangeText={(text) => setContent(text)}
              rightChild={
                <Pressable
                  style={styles.inputButtonContainer}
                  onPress={handleSubmitComment}
                  disabled={!content}
                >
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  awareScrollViewContainer: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
  },
  scrollViewContainer: {
    backgroundColor: colors.GRAY_200,
  },
  commentCount: {
    fontSize: 16,
    marginTop: 12,
    color: colors.BLACK,
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontWeight: "bold",
  },
  commentInputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.WHITE,
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    width: "100%",
  },
  inputButtonContainer: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: colors.ORANGE_600,
  },
  inputButtonText: {
    color: colors.WHITE,
    fontWeight: "bold",
  },
});
