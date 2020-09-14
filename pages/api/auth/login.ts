import db from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  createToken,
  createRefreshToken,
  createTokenCookie,
} from "../../../lib/token";
import { IUser } from "../../../types/types";

const loginUser = async (
  username: string,
  password: string
): Promise<IUser> => {
  return await db.one(
    `
        SELECT users.id, users.name, users.username, users.email, 
        ARRAY_AGG(roles.role_name
        ORDER BY roles.id ASC) AS roles
        FROM users
        INNER JOIN user_roles ON user_roles.user_id = users.id
        INNER JOIN roles ON roles.id = user_roles.roles_id
        WHERE users.username = $1 AND
        users.password = crypt($2, password)
        GROUP BY users.id
        ORDER BY users.id ASC
        `,
    [username, password]
  );
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const username: string = req.body.username.trim();
    const password: string = req.body.password.trim();
    try {
      const user: IUser = await loginUser(username, password);
      console.log(user);
      const token: string = createToken(user);
      await createRefreshToken(user.id);
      createTokenCookie(req, res, token);
      res.statusCode = 200;
      res.json(user);
    } catch (error) {
      console.log(error);
      res.statusCode = 400;
      res.json({
        name: "UsernameOrPasswordError",
        message: "Username or password is incorrect.",
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
