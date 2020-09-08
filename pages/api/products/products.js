// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("../../../lib/db");

export default async (req, res) => {
  const post = await db.any(
    `SELECT * 
     FROM products 
     WHERE is_active = 'true'
     ORDER BY products.id ASC`
  );
  console.log("hello");
  res.statusCode = 200;
  res.json(post);
};
