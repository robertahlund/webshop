import { validateRegistration } from "../../../lib/validations";
import db from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { IUserNameAlreadyTaken, IUserId } from "../../../types/types";

const isUsernameAlreadyTaken = async (username: string) => {
  let usernameAlreadyTaken: IUserNameAlreadyTaken = await db.one(
    `SELECT 
     CASE WHEN EXISTS (SELECT id FROM users WHERE username = $1)
     THEN 'true'
     ELSE 'false'
     END as usernamealreadytaken`,
    [username]
  );
  return usernameAlreadyTaken.usernamealreadytaken.toLowerCase() === "true"
    ? true
    : false;
};

const saveUser = async (username: string, password: string) => {
  let userId: IUserId = await db.one(
    `INSERT INTO users(username, password) 
       VALUES ($1, crypt($2, gen_salt('bf'))) 
       RETURNING id`,
    [username, password]
  );
  await db.none(
    `
  INSERT INTO user_roles(roles_id, user_id)
  VALUES(2, $1)
  `,
    [userId.id]
  );
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const username: string = req.body.username.trim();
    const password: string = req.body.password.trim();

    if (!validateRegistration(username, password)) {
      res.statusCode = 400;
      res.json({
        name: "RegistrationValidationError",
        message: "Username or password is badly formatted.",
      });
      return;
    }

    if (await isUsernameAlreadyTaken(username)) {
      res.statusCode = 400;
      res.json({
        name: "UsernameTakenError",
        message: "Please select another username.",
      });
      return;
    }

    await saveUser(username, password);

    res.statusCode = 200;
    res.json({
      success: "Registration completed successfully.",
    });
  } else {
    res.statusCode = 400;
    res.json({
      name: "UnsupportedMethodError",
      message: "Unsupported method.",
    });
  }
};
