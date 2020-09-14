// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verifyToken } from "../../../lib/token";
import { validateProduct } from "../../../lib/validations";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { IProductQuery, IProduct } from "../../../types/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const products: IProductQuery[] = await db.any("SELECT * FROM products");
    res.statusCode = 200;
    res.send(products);
  } else if (req.method === "POST") {
    try {
      await verifyToken(req, res, true);
      const {
        name,
        description,
        price,
        isActive,
      }: {
        name: string;
        description: string;
        price: number;
        isActive: boolean;
      } = req.body;
      const product: IProductQuery = await db.one(
        `INSERT INTO products(name, description, price, is_active) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
        [name, description, price, isActive]
      );
      res.statusCode = 200;
      res.json(product);
    } catch (error) {
      res.statusCode = 400;
      res.json(error);
    }
  } else if (req.method === "PUT") {
    const product: IProduct = req.body;
    const { id }: { id: number } = product;
    if (!validateProduct(product, true)) {
      res.statusCode = 400;
      res.send({
        name: "ValidationError",
        error: "Product did not pass validation.",
      });
    } else {
      try {
        await verifyToken(req, res, true);
        const {
          name,
          description,
          price,
          isActive,
        }: {
          name: string;
          description: string;
          price: number;
          isActive: boolean;
        } = req.body;
        const product: IProductQuery = await db.one(
          `UPDATE products 
           SET name = $2, description = $3, price = $4, is_active = $5
           WHERE products.id = $1 
           RETURNING *`,
          [id, name, description, price, isActive]
        );
        res.statusCode = 200;
        res.send(product);
      } catch (error) {
        res.statusCode = 400;
        res.json(error);
      }
    }
  } else {
    res.statusCode = 400;
    res.json({
      name: "UnsupportedMethodError",
      message: "Unsupported method.",
    });
  }
};
