import { router, useFocusEffect } from "expo-router";
import { ReactNode } from "react";

import useAuth from "@/hooks/queries/useAuth";

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { auth } = useAuth();

  useFocusEffect(() => {
    !auth.id && router.replace("/auth");
  });

  return <>{children}</>;
};

export default AuthRoute;
