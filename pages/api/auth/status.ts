import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../lib/token";
import { IUser, IUserRoles } from "../../../types/types";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await verifyToken(req, res, false);
      const cookies: { [token: string]: string } = cookie.parse(
        req.headers.cookie as string
      );
      const {
        id,
        roles,
      }: {
        id: number;
        roles: IUserRoles[];
      } = jwt.decode(cookies.token) as IUser;
      res.statusCode = 200;
      res.json({ userId: id, roles });
    } catch (error) {
      res.statusCode = 401;
      res.json({
        name: "SessionExpired",
        message: "Session has expired, reauthentication needed.",
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
