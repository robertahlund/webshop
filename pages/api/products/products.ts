import db from "../../../lib/db";
import {
  IProductList,
  IProductImages,
  IAvailableSizes,
} from "../../../types/types";

export const getProductList = async (): Promise<IProductList[]> => {
  try {
    const products: IProductList[] = await db.any(
      `SELECT products.id, products.name, products.description, products.price, product_image.path FROM products
        INNER JOIN 
            (SELECT DISTINCT ON (product_id) * FROM product_images ORDER BY product_id, product_images.id ASC) AS last_product_image ON last_product_image.product_id = products.id
        INNER JOIN product_image ON product_image.id = last_product_image.product_image_id
        WHERE products.is_active = 'true'
        ORDER BY products.id`
    );
    return Promise.resolve(products);
  } catch (error) {
    return Promise.reject({
      name: "HomeProductError",
      message: "An error occured when fetching products.",
    });
  }
};

export const getProductById = async (
  productId: string
): Promise<IProductList> => {
  try {
    const product: IProductList = await db.one(
      `SELECT id, name, description, price 
       FROM products
       WHERE products.is_active = 'true' AND products.id = $1`,
      [productId]
    );
    return Promise.resolve(product);
  } catch (error) {
    return Promise.reject({
      name: "ProductError",
      message: "An error occured when fetching products by id.",
    });
  }
};

export const getProductImagesByProductId = async (
  productId: string
): Promise<IProductImages[]> => {
  try {
    const productImages: IProductImages[] = await db.any(
      `SELECT product_image.path 
       FROM product_image
       INNER JOIN product_images ON product_images.product_image_id = product_image.id AND 
       product_images.product_id = $1
       LIMIT 1`,
      [productId]
    );
    //TODO remove limit later
    return Promise.resolve(productImages);
  } catch (error) {
    return Promise.reject({
      name: "ProductError",
      message: "An error occured when fetching product images.",
    });
  }
};

export const getProductSizesByProductId = async (
  productId: string
): Promise<IAvailableSizes[]> => {
  try {
    const availableSizes: IAvailableSizes[] = await db.any(
      `SELECT product_size.size, product_stock.stock, product_stock.id 
       FROM product_size
       INNER JOIN product_stock ON product_stock.product_size_id = product_size.id 
       AND product_stock.product_id = $1`,
      [productId]
    );
    return Promise.resolve(availableSizes);
  } catch (error) {
    return Promise.reject({
      name: "ProductError",
      message: "An error occured when fetching product sizes.",
    });
  }
};
