import { IUser } from "./../../../types/types";
import { deleteRefreshToken, removeTokenCookie } from "./../../../lib/token";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const cookies: { [token: string]: string } = cookie.parse(
        req.headers.cookie as string
      );
      const { id }: { id: number } = jwt.decode(cookies.token) as IUser;
      removeTokenCookie(req, res, cookies.token);
      await deleteRefreshToken(String(id));
      res.statusCode = 200;
      res.json({
        message: "You are now logged out.",
      });
    } catch (error) {
      res.statusCode = 400;
      res.json({
        name: "LogoutError",
        message: "An error occured when logging out.",
      });
    }
  } else {
    res.statusCode = 400;
    res.json({
      name: "UnsupportedMethodError",
      message: "Unsupported method.",
    });
  }
};
