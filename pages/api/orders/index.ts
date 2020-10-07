import { IOrderItem, IOrderItemQuery } from "./../../../types/types";
import { extractAuthInfoFromCookie } from "./../../../lib/authCookie";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { verifyToken } from "../../../lib/token";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await verifyToken(req, res, false);
      const { id } = extractAuthInfoFromCookie(req);
      const ordersQuery: IOrderItemQuery[] = await db.any(
        `SELECT orders.id, orders.order_number, order_status.label, orders.address, orders.city, orders.zip_code, orders.phone_number, orders.order_date, orders.order_total
         FROM orders
         INNER JOIN order_status ON order_status.id = orders.order_status_id
         WHERE user_id = $1
         ORDER BY id DESC`,
        [id]
      );
      const orders: IOrderItem[] = [];
      ordersQuery.forEach((order: IOrderItemQuery) => {
        orders.push({
          id: order.id,
          orderNumber: order.order_number,
          orderStatusLabel: order.label,
          address: order.address,
          city: order.city,
          zipCode: order.zip_code,
          phoneNumber: order.phone_number,
          orderDate: order.order_date,
          orderTotal: order.order_total,
        });
      });
      res.statusCode = 200;
      res.json(orders);
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
