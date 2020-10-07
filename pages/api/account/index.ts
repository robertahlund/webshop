import { IUpdateUserAccount, IUserAccount } from "./../../../types/types";
import { IUser, IUserAccountQuery } from "../../../types/types";
import { verifyToken } from "../../../lib/token";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await verifyToken(req, res, false);
      const cookies: { [token: string]: string } = cookie.parse(
        req.headers.cookie as string
      );
      const { id }: { id: number } = jwt.decode(cookies.token) as IUser;
      const userAccountData: IUserAccount = await getUserInformation(id);
      res.statusCode = 200;
      res.send(userAccountData);
    } catch (error) {
      res.statusCode = 400;
      res.json(error);
    }
  } else if (req.method === "PUT") {
    try {
      await verifyToken(req, res, false);
      const cookies: { [token: string]: string } = cookie.parse(
        req.headers.cookie as string
      );
      const { id }: { id: number } = jwt.decode(cookies.token) as IUser;
      const userData: IUpdateUserAccount = req.body;
      await db.none(
        `UPDATE users
         SET address = $2, city = $3, email = $4, name = $5, phone_number = $6, zip_code = $7
         WHERE id = $1
        `,
        [
          id,
          userData.address,
          userData.city,
          userData.email,
          userData.name,
          userData.phoneNumber,
          userData.zipCode,
        ]
      );
      if (userData.newPassword) {
        await db.none(
          `UPDATE users
           SET password = crypt($1, gen_salt('bf'))
           WHERE id = $2
          `,
          [userData.newPassword, id]
        );
      }
      res.statusCode = 200;
      res.send(userData);
    } catch (error) {
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

export const getUserInformation = async (id: number): Promise<IUserAccount> => {
  try {
    const userAccountInfo: IUserAccountQuery = await db.one(
      `
    SELECT id, name, address, zip_code, email, phone_number, username, city, customer_number
    FROM users
    WHERE id = $1`,
      [id]
    );
    return Promise.resolve({
      id: userAccountInfo.id,
      name: userAccountInfo.name,
      address: userAccountInfo.address,
      zipCode: userAccountInfo.zip_code,
      email: userAccountInfo.email,
      phoneNumber: userAccountInfo.phone_number,
      username: userAccountInfo.username,
      city: userAccountInfo.city,
      customerNumber: userAccountInfo.customer_number,
    });
  } catch (error) {
    return Promise.reject({
      name: "GetUserInformationError",
      message: "Error fetching user information.",
    });
  }
};
