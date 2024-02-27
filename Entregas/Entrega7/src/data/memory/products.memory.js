import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  #products = [];
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.#products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    this.#products = [];
    this.init();
  }

  update(id, newData) {
    try {
      const index = this.#products.findIndex((product) => product.id === id);

      if (index === -1) {
        throw new Error("Product not found");
      }

      const updatedProduct = { ...this.#products[index], ...newData };
      this.#products[index] = updatedProduct;

      return updatedProduct;
    } catch (error) {
      return error.message;
    }
  }

  create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Please, insert title, photo, price, stock");
      }
      const product = {
        id:
          this.#products.length === 0
            ? 1
            : this.#products[this.#products.length - 1].id + 1,
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      this.#products.push(product);
      return product.id;
    } catch (error) {
      return error.message;
    }
  }

  readProducts() {
    try {
      if (this.#products.length === 0) {
        throw new Error("Not found products!");
      } else {
        return this.#products;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      let one = this.#products.find((each) => each.id === Number(id));
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

const products = new ProductsManager("./src/data/memory/products.json");
export default products;
