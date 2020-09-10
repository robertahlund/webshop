import { validateRegistration } from "../../../lib/validations";

const db = require("../../../lib/db");

const isUsernameAlreadyTaken = async (username) => {
  const usernameAlreadyTaken = await db.one(
    `SELECT 
     CASE WHEN EXISTS (SELECT id FROM users WHERE username = $1)
     THEN 'true'
     ELSE 'false'
     END as username_taken`,
    [username]
  );
  return usernameAlreadyTaken.username_taken.toLowerCase() === "true"
    ? true
    : false;
};

const saveUser = async (username, password) => {
  const userId = await db.one(
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

export default async (req, res) => {
  if (req.method === "POST") {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

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
