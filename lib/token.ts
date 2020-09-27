import db from "./db";
import { v4 as uuidv4 } from "uuid";
import { addDays } from "date-fns";
import { IUser, IUserRoles, IRefreshToken } from "../types/types";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const createTokenCookie = (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string
) => {
  const authCookie: string = cookie.serialize("token", token, {
    expires: addDays(new Date(), 60),
    httpOnly: true,
    sameSite: true,
    secure: true,
    path: "/api/",
  });
  res.setHeader("Set-Cookie", authCookie);
};

export const removeTokenCookie = (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string
) => {
  const authCookie: string = cookie.serialize("token", token, {
    expires: new Date(),
    httpOnly: true,
    sameSite: true,
    secure: true,
    path: "/api/",
  });
  res.setHeader("Set-Cookie", authCookie);
};

export const createToken = (user: IUser): string => {
  return jwt.sign(user, String(process.env.JWT_SECRET), {
    expiresIn: "15min",
  });
};

const verifyAdminRole = (roles: IUserRoles[]): boolean => {
  if (roles.includes("Administrator")) {
    return true;
  }
  throw new Error("Administrator role required.");
};

export const verifyToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  shouldValidateAdminRole: boolean
): Promise<boolean> => {
  try {
    const cookies: { [token: string]: string } = cookie.parse(
      req.headers.cookie as string
    );
    jwt.verify(cookies.token, String(process.env.JWT_SECRET));
    if (shouldValidateAdminRole) {
      const { roles }: { roles: IUserRoles[] } = jwt.decode(
        cookies.token
      ) as IUser;
      verifyAdminRole(roles);
    }
    return Promise.resolve(true);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const cookies: { [token: string]: string } = cookie.parse(
        req.headers.cookie as string
      );
      const { id, roles }: { id: number; roles: IUserRoles[] } = jwt.decode(
        cookies.token
      ) as IUser;
      const hasValidToken: boolean = await validateRefreshToken(id);
      if (hasValidToken) {
        if (shouldValidateAdminRole) {
          verifyAdminRole(roles);
        }
        await updateTokens(req, res);
        return Promise.resolve(true);
      } else {
        await deleteRefreshToken(String(id));
        removeTokenCookie(req, res, cookies.token);
        return Promise.reject({
          name: "RefreshTokenExpired",
          message: "Refresh token has expired, reauthentication needed.",
        });
      }
    }
    return Promise.reject({
      name: "InvalidToken",
      message: "AccessToken did not pass validation.",
    });
  }
};

const validateRefreshToken = async (userId: number): Promise<boolean> => {
  try {
    await db.one(
      `
        SELECT id 
        FROM refresh_token 
        WHERE expires_at > $2 AND
        user_id = $1
    `,
      [userId, new Date()]
    );
    return Promise.resolve(true);
  } catch (error) {
    console.log(error);
    return Promise.reject({
      name: "InvalidRefreshToken",
      message: "No refresh token was found.",
    });
  }
};

export const deleteRefreshToken = async (userId: string): Promise<void> => {
  await db.none(
    `
      DELETE FROM refresh_token
      WHERE user_id = $1
    `,
    [userId]
  );
};

const updateTokens = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies: { [token: string]: string } = cookie.parse(
    req.headers.cookie as string
  );
  const {
    id,
    name,
    username,
    email,
    roles,
  }: {
    id: number;
    name: string;
    username: string;
    email: string;
    roles: IUserRoles[];
  } = jwt.decode(cookies.token) as IUser;
  const newToken: string = createToken({
    id,
    name,
    username,
    email,
    roles,
  });
  await createRefreshToken(id);
  createTokenCookie(req, res, newToken);
};

export const createRefreshToken = async (userId: number): Promise<void> => {
  const refreshToken: IRefreshToken = {
    token: uuidv4(),
    expiresAt: addDays(new Date(), 60),
  };
  await db.none(
    `
      INSERT INTO refresh_token(user_id, refresh_token, expires_at)
      VALUES($1, $2, $3) 
      ON CONFLICT (user_id) 
      DO 
      UPDATE SET refresh_token = $2, expires_at = $3
    `,
    [userId, refreshToken.token, refreshToken.expiresAt]
  );
};
