import { IProductOrder, IProductOrderQuery } from "./../../../types/types";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../lib/token";
import db from "../../../lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await verifyToken(req, res, false);
      const { orderId }: { [key: string]: string | string[] } = req.query;
      const productsQuery: IProductOrderQuery[] = await db.any(
        `SELECT order_row.id, order_row.quantity, order_row.amount, products.name, product_image.path, order_row.size, products.id AS product_id
          FROM order_row
          INNER JOIN products ON products.id = order_row.product_id
          INNER JOIN (SELECT DISTINCT ON (product_id) * FROM product_images ORDER BY product_id, product_images.id ASC) AS last_product_image ON last_product_image.product_id = products.id
          INNER JOIN product_image ON product_image.id = last_product_image.product_image_id
          WHERE order_row.order_id = $1`,
        [orderId]
      );
      const products: IProductOrder[] = [];
      productsQuery.forEach((product: IProductOrderQuery) =>
        products.push({
          id: product.id,
          quantity: product.quantity,
          amount: product.amount,
          name: product.name,
          path: product.path,
          size: product.size,
          productId: product.product_id,
        })
      );
      res.statusCode = 200;
      res.json(products);
    } catch (error) {
      res.statusCode = 400;
      res.json({
        name: error.name,
        message: error.message,
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
