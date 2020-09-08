import db from "../../../lib/db";
import { v4 as uuidv4 } from "uuid";
import { addDays } from "date-fns";
const jwt = require("jsonwebtoken");
//https://github.com/auth0/node-jsonwebtoken#readme

const loginUser = async (username, password) => {
  return await db.one(
    `
        SELECT  users.id, users.name, users.username, users.email, 
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

const createToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = async (userId) => {
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

export default async (req, res) => {
  if (req.method === "POST") {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    try {
      const user = await loginUser(username, password);
      const token = createToken(user);
      await createRefreshToken(user.id);

      res.statusCode = 200;
      res.json(user);
    } catch (error) {
      console.log(error);
      res.statusCode = 400;
      res.json({
        error: "Username or password is incorrect.",
      });
    }
  } else {
    res.statusCode = 400;
    res.send("Unsupported method.");
  }
};
