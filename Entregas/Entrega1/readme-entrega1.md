Descripcion Entrega1:

Se creo dos clases ProductManager y UserManager con variables privadas y con una clase que guarda todos los productos y usuarios en un arreglo :
class ProductManager {
static #products = [];
static #nextId = 1;

Luego se crea para ambas clases los métodos Create(data) el cual agrega un producto-usuario añ arreglo inicial:
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

Luego el método read() el cual devuelve el arreglo con todos los productos/usuarios:

read() {
return ProductManager.#products;
}

y por último el método readOne() el cual devuelve el objeto producto/usuario buscado:

readOne(id) {
const product = ProductManager.#products.find((p) => p.id === id);
return product ? product : `No se encontró un producto con ID ${id}`;
}

Se verifica que funcione con :

console.log("Lista de usuarios", userManager.readUsers());
console.log("Usuario con ID 2", userManager.readOneUser(2));
