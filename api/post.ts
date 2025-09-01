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

export { createPost, getPosts };
