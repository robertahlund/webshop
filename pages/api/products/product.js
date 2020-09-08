// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("../../../lib/db");
const validator = require("validator");

export default async (req, res) => {
  //const post = await db.any("SELECT * FROM products");
  if (req.method === "GET") {
    res.statusCode = 200;
    res.send(req.method);
  } else if (req.method === "POST") {
    const { name, description, price, isActive } = req.body;
    const product = await db.one(
      `INSERT INTO products(name, description, price, is_active) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [name, description, price, isActive]
    );
    res.statusCode = 200;
    res.json(product);
  } else if (req.method === "PUT") {
    const { id, name, description, price, isActive } = req.body;
    if (
      !validator.isInt(String(id)) ||
      validator.isEmpty(name) ||
      validator.isEmpty(description) ||
      !validator.isCurrency(String(price)) ||
      !validator.isBoolean(String(isActive))
    ) {
      res.statusCode = 400;
      res.send("Failed validation.");
    } else {
      const product = await db.one(
        `UPDATE products 
         SET name = $2, description = $3, price = $4, is_active = $5
         WHERE products.id = $1 
         RETURNING *`,
        [id, name, description, price, isActive]
      );
      res.statusCode = 200;
      res.send(product);
    }
  } else {
    res.statusCode = 400;
    res.send("Unsupported method.");
  }
};
