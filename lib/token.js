import db from "./db";
import { v4 as uuidv4 } from "uuid";
import { addDays } from "date-fns";
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const Cookies = require("js-cookie");

export const createTokenCookie = (req, res, token) => {
  const authCookie = cookie.serialize("token", token, {
    expires: addDays(new Date(), 60),
    httpOnly: true,
    sameSite: true,
    secure: true,
    path: "/api/",
  });
  res.setHeader("Set-Cookie", authCookie);
};

export const createToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "15min",
  });
};

const verifyAdminRole = (roles) => {
  if (roles.includes("Administrator")) {
    return true;
  }
  throw new Error("Administrator role required.");
};

export const verifyToken = async (req, res, shouldValidateAdminRole) => {
  try {
    const cookies = cookie.parse(req.headers.cookies);
    jwt.verify(cookies.token, process.env.JWT_SECRET);
    if (shouldValidateAdminRole) {
      const { roles } = jwt.decode(cookies.token);
      verifyAdminRole(roles);
    }
    return Promise.resolve(true);
  } catch (error) {
    Cookies.remove("token", { path: "/api/" });
    Cookies.set("token", "", { path: "/api/", expires: 0 });
    if (error.name === "TokenExpiredError") {
      const cookies = cookie.parse(req.headers.cookies);
      const { id } = jwt.decode(cookies.token);
      const hasValidToken = await validateRefreshToken(id);
      if (hasValidToken) {
        await updateTokens(req, res);
        return Promise.resolve(true);
      } else {
        return Promise.reject({
          name: "RefreshTokenExpired",
          message: "Refresh token has expired, reauthentication needed.",
        });
      }
    }
    console.log(error);
    return Promise.reject({
      name: "InvalidToken",
      message: "AccessToken did not pass validation.",
    });
  }
};

const validateRefreshToken = async (userId) => {
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

const updateTokens = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookies);
  const { id, name, username, email, roles } = jwt.decode(cookies.token);
  const newToken = createToken({
    id,
    name,
    username,
    email,
    roles,
  });
  await createRefreshToken(id);
  createTokenCookie(req, res, newToken);
};

export const createRefreshToken = async (userId) => {
  const refreshToken = {
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
