import { useLocalSearchParams } from "expo-router";
import { Fragment, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import useCreateComment from "@/hooks/queries/useCreateComment";
import useGetPost from "@/hooks/queries/useGetPost";
import useKeyboard from "@/hooks/useKeyboard";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();

  const { data: post, isPending, isError } = useGetPost(Number(id));
  const createComment = useCreateComment();
  const { isKeyboardVisible } = useKeyboard();
  const insets = useSafeAreaInsets();

  const [content, setContent] = useState("");
  const scrollRef = useRef<ScrollView | null>(null);

  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss(); // 키보드 닫기
  };

  if (isPending || isError) {
    return <></>;
  }

  const handleSubmitComment = () => {
    const commentData = { content, postId: Number(id) };

    // 대댓글 등록 시
    if (parentCommentId) {
      createComment.mutate({ ...commentData, parentCommentId });
      setContent("");
      handleCancelReply();
      return;
    }

    // 댓글 등록 시
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
        {/* 키보드가 인풋창을 가림 방지 - 안드로이드에선 KeyboardAwareScrollView로 해결되지 않는 이슈가 있어서 이 방식으로 변경함*/}
        <KeyboardAvoidingView
          contentContainerStyle={styles.awareScrollViewContainer}
          behavior="height"
          keyboardVerticalOffset={Platform.OS === "ios" || isKeyboardVisible ? 100 : insets.bottom}
        >
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
              <Fragment key={comment.id}>
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                />
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </Fragment>
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              value={content}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
              placeholder={parentCommentId ? "답글을 입력해주세요." : "댓글을 입력해주세요."}
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
        </KeyboardAvoidingView>
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
