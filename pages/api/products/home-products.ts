import db from "../../../lib/db";
import { IHomeProduct } from "../../../types/types";

const getHomeProducts = async (): Promise<IHomeProduct[]> => {
  try {
    const products: IHomeProduct[] = await db.any(
      `SELECT products.id, products.name, products.description, products.price, product_image.path FROM products
        INNER JOIN 
            (SELECT DISTINCT ON (product_id) * FROM product_images ORDER BY product_id, product_images.id ASC) AS last_product_image ON last_product_image.product_id = products.id
        INNER JOIN product_image ON product_image.id = last_product_image.product_image_id
        WHERE products.is_active = 'true'
        ORDER BY products.id
        LIMIT 5`
    );
    return Promise.resolve(products);
  } catch (error) {
    return Promise.reject({
      name: "HomeProductError",
      message: "An error occured when fetching home products.",
    });
  }
};

export default getHomeProducts;
