// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verifyToken } from "../../../lib/token";
import { validateProduct } from "../../../lib/validations";
const db = require("../../../lib/db");

export default async (req, res) => {
  if (req.method === "GET") {
    const products = await db.any("SELECT * FROM products");
    res.statusCode = 200;
    res.send(products);
  } else if (req.method === "POST") {
    try {
      await verifyToken(req, res);
      const { name, description, price, isActive } = req.body;
      const product = await db.one(
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
    const product = req.body;
    const { id } = product;
    if (!validateProduct(product)) {
      res.statusCode = 400;
      res.send({
        name: "ValidationError",
        error: "Product did not pass validation.",
      });
    } else {
      try {
        await verifyToken(req, res);
        const { name, description, price, isActive } = req.body;
        const product = await db.one(
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
