import User from "./models/users.model.js";
import Product from "./models/products.model.js";
import Order from "./models/orders.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }
  async read({ filter, sortAndPaginate }) {
    try {
      const { limit = 10, page = 1, sort = {} } = sortAndPaginate || {};

      const query = this.model
        .find(filter)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit);
      const all = await query.exec();

      if (all.length === 0) {
        const error = new Error("There aren't any documents");
        error.statusCode = 404;
        throw error;
      }

      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(this.model, one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const deletedItem = await this.model.findByIdAndDelete(id);
      if (!deletedItem) {
        const error = new Error(`${this.model.modelName} not found`);
        error.statusCode = 404;
        throw error;
      }
      return deletedItem;
    } catch (error) {
      throw error;
    }
  }
  async readByEmail(email) {
    try {
      const user = await this.model.findOne({ email });

      if (!user) {
        const error = new Error(`User with email ${email} not found`);
        error.statusCode = 404;
        throw error;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");
      console.log(stats);
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }

  async report(uid) {
    try {
      const userOrders = await this.model.find({ u_id: uid });

      if (userOrders.length === 0) {
        const error = new Error(`No orders found for user with ID ${uid}`);
        error.statusCode = 404;
        throw error;
      }

      const totalAmount = userOrders.reduce(
        (total, order) => total + order.p_id.price * order.quantity,
        0
      );

      return {
        userId: uid,
        totalAmount: totalAmount,
      };
    } catch (error) {
      throw error;
    }
  }
}

const users = new MongoManager(User);
const products = new MongoManager(Product);
const orders = new MongoManager(Order);

export { users, products, orders };
export default MongoManager;
