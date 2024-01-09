class OrderManager {
  static #orders = [];
  static #nextId = 1;

  static createOrder(data) {
    try {
      if (!data.uid || !data.pid || !data.quantity) {
        throw new Error("uid, pid, and quantity are required");
      }

      const order = {
        id: OrderManager.#nextId++,
        uid: data.uid,
        pid: data.pid,
        quantity: data.quantity,
        state: "reserved",
      };

      OrderManager.#orders.push(order);
      return order.id;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  static read() {
    return OrderManager.#orders;
  }

  static readOne(uid) {
    return OrderManager.#orders.filter((order) => order.uid === uid);
  }

  static update(oid, quantity, state) {
    try {
      const order = OrderManager.#orders.find((order) => order.id === oid);
      if (!order) {
        throw new Error("Order not found");
      }

      if (quantity !== undefined) {
        order.quantity = quantity;
      }

      if (state !== undefined) {
        order.state = state;
      }

      return order;
    } catch (error) {
      throw new Error(`Failed to update order: ${error.message}`);
    }
  }

  static destroy(oid) {
    try {
      const index = OrderManager.#orders.findIndex((order) => order.id === oid);
      if (index === -1) {
        throw new Error("Order not found");
      }

      OrderManager.#orders.splice(index, 1);
      return oid;
    } catch (error) {
      throw new Error(`Failed to destroy order: ${error.message}`);
    }
  }
}

export default OrderManager;
