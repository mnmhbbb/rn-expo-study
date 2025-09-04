import axiosInstance from "@/api/axios";
import { CreateCommentDto } from "@/types";

const createComment = async (body: CreateCommentDto): Promise<number> => {
  const { data } = await axiosInstance.post("/comments", body);
  return data;
};

const deleteComment = async (id: number): Promise<number> => {
  const { data } = await axiosInstance.delete(`/comments/${id}`);
  return data;
};

export { createComment, deleteComment };
