import { verifyToken } from "../../../lib/token";

const db = require("../../../lib/db");

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      console.log("Verifying token...");
      await verifyToken(req, res, true);
      console.log("Token verified.");
      res.statusCode = 200;
      res.json({
        success: "This went well.",
      });
    } catch (error) {
      console.log(error);
      //TODO no valid token, cookie is deleted at this point. Requires reauthentication now
      res.statusCode = 400;
      res.json(error);
    }
  } else {
    res.statusCode = 400;
    res.json({
      name: "UnsupportedMethodError",
      message: "Unsupported method.",
    });
  }
};
