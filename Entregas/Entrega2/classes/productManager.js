const fs = require("fs");
const path = require("path");

class ProductManager {
  constructor() {
    this.filePath = path.join(__dirname, "..", "data", "products.json");
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async write(data) {
    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  }

  async readOne(id) {
    const items = await this.read();
    return items.find((item) => item.id === id);
  }

  async create(data) {
    const items = await this.read();
    const newItem = {
      id: items.length + 1,
      ...data,
    };
    items.push(newItem);
    await this.write(items);
    return newItem;
  }
}

const productManager = new ProductManager();

productManager
  .create({
    title: "Notebook",
    photo: "imagen_prueba.jpg",
    price: 1500,
    stock: 20,
  })
  .then((newProduct) => {
    return "Producto creado:", newProduct;

    return productManager.read();
  })
  .then((allProducts) => {
    return "Todos los productos:", allProducts;

    const productIdToRead = 1;
    return productManager.readOne(productIdToRead);
  })
  .then((productById) => {
    return "Producto por ID:", productById;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
