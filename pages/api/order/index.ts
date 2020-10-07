import { extractAuthInfoFromCookie } from "./../../../lib/authCookie";
import {
  ICreateOrderRow,
  IOrderId,
  IUserAccount,
} from "./../../../types/types";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../lib/token";
import db from "../../../lib/db";
import { getUserInformation } from "../account";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
  } else if (req.method === "POST") {
    try {
      await verifyToken(req, res, false);
      const order: ICreateOrderRow[] = req.body;
      const { id } = extractAuthInfoFromCookie(req);
      const orderTotal: number = calculateOrderTotal(order);
      const userAccountData: IUserAccount = await getUserInformation(id);
      const insertedOrderId: IOrderId = await db.one(
        `INSERT INTO orders(user_id, order_total, order_date, address, zip_code, city, phone_number, order_status_id)
         VALUES($1, $2, $3, $4, $5, $6, $7, 1)
         RETURNING id`,
        [
          id,
          orderTotal,
          new Date(),
          userAccountData.address,
          userAccountData.zipCode,
          userAccountData.city,
          userAccountData.phoneNumber,
        ]
      );
      const orderId: number = insertedOrderId.id;
      order.forEach(async (orderRow: ICreateOrderRow) => {
        await db.none(
          `INSERT INTO order_row(order_id, product_id, quantity, amount, size)
           VALUES($1, $2, $3, $4, $5)`,
          [
            orderId,
            orderRow.productId,
            orderRow.quantity,
            orderRow.amount,
            orderRow.size,
          ]
        );
        await db.none(
          `UPDATE product_stock
           SET stock = stock - 1
           WHERE id = $1`,
          [orderRow.productStockId]
        );
      });
      res.statusCode = 200;
      res.json({});
    } catch (error) {
      res.statusCode = 400;
      res.json({
        name: error.name,
        message: error.message,
      });
    }
  } else if (req.method === "PUT") {
  } else {
    res.statusCode = 400;
    res.json({
      name: "UnsupportedMethodError",
      message: "Unsupported method.",
    });
  }
};

const calculateOrderTotal = (orderRows: ICreateOrderRow[]): number => {
  return Number(
    parseFloat(
      String(
        orderRows.reduce(
          (accumulator: number, currentValue: ICreateOrderRow) =>
            accumulator + Number(currentValue.amount) * currentValue.quantity,
          0
        )
      )
    ).toFixed(2)
  );
};
