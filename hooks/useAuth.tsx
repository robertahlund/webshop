import { useRouter } from "next/dist/client/router";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../slices";

const useAuth = (): [boolean, boolean | undefined] => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean | undefined>(false);
  const router = useRouter();

  const reduxAuthState = useSelector((state: RootState) => {
    return {
      isAuthenticated: !!state.auth.userId,
      initialLoad: state.auth.initialLoad,
    };
  });

  useEffect(() => {
    setIsAuthenticated(reduxAuthState.isAuthenticated);
    setInitialLoad(reduxAuthState.initialLoad);
  }, [reduxAuthState]);

  useEffect(() => {
    if (!isAuthenticated && initialLoad) {
      router.push("/");
    }
  }, [isAuthenticated, initialLoad, router]);

  return [isAuthenticated, initialLoad];
};

export default useAuth;
