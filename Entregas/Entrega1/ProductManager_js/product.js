class ProductManager {
  static #products = [];
  static #nextId = 1;

  create({ title, price, ...data }) {
    if (title && data.photo && price && data.stock) {
      const product = {
        id: ProductManager.#nextId,
        title,
        photo: data.photo,
        price,
        stock: data.stock,
      };

      ProductManager.#products.push(product);
      ProductManager.#nextId++;

      return product;
    } else {
      return "Error: el objeto data debe tener las propiedades title, photo, price y stock";
    }
  }

  read() {
    return ProductManager.#products;
  }

  readOne(id) {
    const product = ProductManager.#products.find((p) => p.id === id);
    return product ? product : `No se encontró un producto con ID ${id}`;
  }
}

const productManager = new ProductManager();

productManager.create({
  title: "arroz",
  photo: "imagen_arroz.jpg",
  price: 80,
  stock: 200,
});

productManager.create({
  title: "harina",
  photo: "imagen_harina.jpg",
  price: 60,
  stock: 150,
});

productManager.create({
  title: "garbanzos",
  photo: "imagen_garbanzos.jpg",
  price: 50,
  stock: 80,
});

const listaProductos = productManager.read();
const productoConId2 = productManager.readOne(2);

//console.log("Lista de productos", productManager.read());
//console.log("Usuario con ID 2", productManager.readOne(2));
