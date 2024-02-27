import fs from "fs";

class OrderManager {
  #orders = [];
  #path;

  async init() {
    try {
      const exists = fs.existsSync(this.#path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.#path, data);
      } else {
        this.#orders = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
      }
    } catch (error) {
      throw new Error(`Failed to initialize OrderManager: ${error.message}`);
    }
  }

  constructor(path) {
    this.#path = path;
    this.#orders = [];
    this.init().then(() => {
      console.log("Initialization complete.");
    });
  }

  async createOrder(data) {
    try {
      const { uid, pid, quantity } = data;

      if (!uid || !pid || !quantity) {
        throw new Error("uid, pid, state and quantity are required");
      }

      const nextId =
        this.#orders.length > 0
          ? Math.max(...this.#orders.map((order) => order.id)) + 1
          : 1;

      const order = {
        id: nextId,
        uid: uid,
        pid: pid,
        quantity: quantity,
        state: "reserved",
      };

      this.#orders.push(order);
      const jsonData = JSON.stringify(this.#orders, null, 2);
      await fs.promises.writeFile(this.#path, jsonData);
      return order.id;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  read() {
    return this.#orders;
  }

  readOne(oid) {
    console.log("Searching for order with ID:", oid);
    const foundOrders = this.#orders.find(
      (order) => order.id === parseInt(oid)
    );

    if (foundOrders) {
      return foundOrders;
    } else {
      console.log("Order not found");
      throw new Error("Order not found");
    }
  }

  async update(oid, quantity, state) {
    try {
      console.log("Received order ID:", oid);

      const orderIndex = this.#orders.findIndex(
        (order) => order.id === parseInt(oid)
      );
      if (orderIndex === -1) {
        throw new Error("Order not found");
      }

      if (quantity !== undefined) {
        this.#orders[orderIndex].quantity = quantity;
      }

      if (state !== undefined) {
        this.#orders[orderIndex].state = state;
      }

      const jsonData = JSON.stringify(this.#orders, null, 2);
      await fs.promises.writeFile(this.#path, jsonData);
      return this.#orders[orderIndex];
    } catch (error) {
      throw new Error(`Failed to update order: ${error.message}`);
    }
  }

  async removeOrder(oid) {
    try {
      const orderIndex = this.#orders.findIndex(
        (order) => order.id === parseInt(oid)
      );
      if (orderIndex === -1) {
        throw new Error("Order not found");
      }

      this.#orders.splice(orderIndex, 1);
      const jsonData = JSON.stringify(this.#orders, null, 2);
      await fs.promises.writeFile(this.#path, jsonData);
      return oid;
    } catch (error) {
      throw new Error(`Failed to remove order: ${error.message}`);
    }
  }
}
const order = new OrderManager("./orders.json");
await order.init();

export default order;
