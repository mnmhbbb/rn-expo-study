import axiosInstance from "@/api/axios";
import { Profile } from "@/types";
import { getSecureStore } from "@/utils/secureStore";

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async (body: RequestUser): Promise<void> => {
  const { data } = await axiosInstance.post("/auth/signup", body);

  return data;
};

const postLogin = async (body: RequestUser): Promise<{ accessToken: string }> => {
  const { data } = await axiosInstance.post("/auth/signin", body);

  return data;
};

const getMe = async (): Promise<Profile> => {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export { getMe, postLogin, postSignup };
