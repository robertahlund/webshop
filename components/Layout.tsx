import React, { FC, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateUserSession } from "../slices/authSlice";

interface LayoutProps {
  children: ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validateUserSession());
  }, [dispatch]);
  return <>{children}</>;
};

export default Layout;
