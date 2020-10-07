import { IUser } from "./../types/types";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const extractAuthInfoFromCookie = (req: NextApiRequest): IUser => {
  try {
    return jwt.decode(parseAuthCookie(req)) as IUser;
  } catch (error) {
    throw new Error("Error decoding the authentication cookie.");
  }
};

export const parseAuthCookie = (req: NextApiRequest): string => {
  try {
    const cookies: { [token: string]: string } = cookie.parse(
      req.headers.cookie as string
    );
    return cookies.token;
  } catch (error) {
    throw new Error("Error parsing the authentication cookie.");
  }
};
