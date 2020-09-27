import { NextRouter, useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { IAuth } from "../types/types";

const useRouteIsAvailable = (isOnlyAdminRoute?: boolean): boolean => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user: IAuth = useSelector((state: RootState) => state.auth);
  const router: NextRouter = useRouter();

  useEffect(() => {
    const verifyAdminRole = (): boolean => {
      if (user.roles.includes("Administrator")) {
        return true;
      } else return false;
    };
    if (user.userId && !isOnlyAdminRoute) {
      router.push("/");
    } else if (user.userId && isOnlyAdminRoute) {
      if (!user.userId) {
        router.push("/");
      } else {
        if (!verifyAdminRole()) {
          router.push("/");
        }
      }
    }
    setIsLoading(false);
  }, [user, router, isOnlyAdminRoute]);
  return isLoading;
};

export default useRouteIsAvailable;
