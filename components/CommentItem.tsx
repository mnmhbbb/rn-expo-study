import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import InputField from "@/components/InputField";
import Profile from "@/components/Profile";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useDeleteComment from "@/hooks/queries/useDeleteComment";
import { Comment } from "@/types";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean; // 대댓글 여부
  parentCommentId?: number | null; // 대댓글의 부모댓글 id(즉, 대댓글 입력폼이 열려있는 상황에서 부모댓글 렌더링 하는 상황)
  onReply?: () => void;
  onCancelReply?: () => void;
}

const CommentItem = ({
  comment,
  isReply = false,
  parentCommentId,
  onReply,
  onCancelReply,
}: CommentItemProps) => {
  const { auth } = useAuth();
  const deleteComment = useDeleteComment();
  const { showActionSheetWithOptions } = useActionSheet();

  const getCommentBackgroundColor = () => {
    // 대댓글 입력 중일 때, 부모댓글의 색상을 적용하여 어떤 댓글의 대댓글을 달고 있는지 가독성 좋게 함
    if (parentCommentId === comment.id) {
      return colors.ORANGE_100;
    }
    // 대댓글은 항상 회색 고정
    if (isReply) {
      return colors.GRAY_100;
    }
    return colors.WHITE;
  };

  const handlePressOption = () => {
    const options = ["삭제", "취소"];
    const cancelButtonIndex = 1;
    const destructiveButtonIndex = 0;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex: // 삭제
            deleteComment.mutate(comment.id);
            break;
          case cancelButtonIndex: // 취소
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: getCommentBackgroundColor() }]}>
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons name="arrow-right-bottom" size={24} color={colors.BLACK} />
        )}

        <Profile
          imageUri={comment.isDeleted ? "" : comment.user.imageUri || ""}
          nickname={comment.isDeleted ? "(삭제)" : comment.user.nickname}
          createdAt={comment.createdAt}
          onPress={() => {}}
          option={
            auth.id === comment.user.id && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      <InputField
        value={comment.isDeleted ? "삭제된 댓글입니다" : comment.content}
        editable={false}
      />

      {!comment.isDeleted && !isReply && (
        <View style={styles.replyButtonContainer}>
          <Pressable onPress={onReply}>
            <Text style={styles.replyButton}>답글</Text>
          </Pressable>

          {/* 대댓글 입력 중인 상황에서만 '취소' 버튼 노출 */}
          {parentCommentId === comment.id && (
            <Pressable onPress={onCancelReply}>
              <Text style={styles.cancelButton}>취소</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  replyButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  replyButton: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  cancelButton: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.BLACK,
  },
});

export default CommentItem;
