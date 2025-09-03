import { CreatePostDto, Post } from "@/types";

import axiosInstance from "@/api/axios";

const createPost = async (body: CreatePostDto) => {
  const { data } = await axiosInstance.post("/posts", body);

  return data;
};

const getPosts = async (page = 1): Promise<Post[]> => {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);

  return data;
};

// 성공하면 게시물 id 반환
const deletePost = async (id: number): Promise<number> => {
  const { data } = await axiosInstance.delete(`/posts/${id}`);

  return data;
};

const getPost = async (id: number): Promise<Post> => {
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data;
};

type RequestUpdatePost = {
  id: number;
  body: CreatePostDto;
};

// 성공하면 게시물 id 반환
const updatePost = async ({ id, body }: RequestUpdatePost): Promise<number> => {
  const { data } = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
};

export { createPost, deletePost, getPost, getPosts, updatePost };
