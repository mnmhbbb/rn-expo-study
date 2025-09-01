import { CreatePostDto } from "@/types";

import axiosInstance from "@/api/axios";

const createPost = async (body: CreatePostDto) => {
  const { data } = await axiosInstance.post("/posts", body);

  return data;
};

export { createPost };
