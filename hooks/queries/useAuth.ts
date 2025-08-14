import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

import { getMe, postLogin, postSignup } from "@/api/auth";
import queryClient from "@/api/queryClient";
import { removeHeader, setHeader } from "@/utils/header";
import { deleteSecureStore, setSecureStore } from "@/utils/secureStore";

const useGetMe = () => {
  const { data, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
  });

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
};

const useLogin = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await setSecureStore("accessToken", accessToken);
      queryClient.fetchQuery({ queryKey: ["auth", "getMe"] });
      router.replace("/");
    },
    onError: () => {},
  });
};

const useSignup = () => {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
    onError: () => {},
  });
};

const useAuth = () => {
  const { data } = useGetMe(); // useAuth 훅을 사용하는 컴포넌트에서는 항상 실행 됨
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const logout = () => {
    removeHeader("Authorization");
    deleteSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: ["auth"] });
    router.replace("/auth/login");
  };

  return {
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
    },
    loginMutation,
    signupMutation,
    logout,
  };
};

export default useAuth;
