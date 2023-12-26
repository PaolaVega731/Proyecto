import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  static #products = [];
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }
  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Please, insert title, photo, price, stock");
      }
      const product = {
        id:
          ProductsManager.#products.length === 0
            ? 1
            : ProductsManager.#products[ProductsManager.#products.length - 1]
                .id + 1,
        title,
        photo,
        price: data.price,
        stcok: data.stock,
      };
      ProductsManager.#products.push(product);
      return product.id;
    } catch (error) {
      return error.message;
    }
  }
  readProducts() {
    try {
      if (ProductsManager.#products.length === 0) {
        throw new Error("Not found products!");
      } else {
        return ProductsManager.#products;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    try {
      let one = ProductsManager.#products.find(
        (each) => each.id === Number(id)
      );
      if (one) {
        return one;
      } else {
        throw new Error("Not found product with id=" + id);
      }
    } catch (error) {
      return error.message;
    }
  }
}
const products = new ProductsManager();
