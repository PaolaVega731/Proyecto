import Product from "../../data/mongo/models/product.model.js"; // Importa el modelo de producto de Mongoose

class ProductsManager {
  // No es necesario el método init() para cargar productos de MongoDB

  // Método para crear un nuevo producto
  async create(data) {
    try {
      // Crea un nuevo documento de producto en la base de datos
      const product = await Product.create(data);
      return product.id; // O cualquier otro identificador único que utilices
    } catch (error) {
      return error.message;
    }
  }

  // Método para leer productos con filtro
  async readProducts(filter) {
    try {
      // Busca documentos de productos en la base de datos que cumplan con el filtro
      const filteredProducts = await Product.find(filter);
      if (filteredProducts.length === 0) {
        throw new Error("No se encontraron productos");
      }
      return filteredProducts;
    } catch (error) {
      return error.message;
    }
  }

  // Método para leer un producto por su ID
  async readOne(id) {
    try {
      // Busca un documento de producto en la base de datos por su ID
      const one = await Product.findById(id);
      if (!one) {
        throw new Error(`No se encontró ningún producto con el id ${id}`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  // Los métodos update() y remove() pueden ajustarse para actualizar y eliminar productos en la base de datos, según tus necesidades específicas
}

// Exporta una instancia de ProductsManager
const products = new ProductsManager();
export default products;
