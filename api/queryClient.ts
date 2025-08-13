import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 20, // 20초 동안 데이터 유지
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
