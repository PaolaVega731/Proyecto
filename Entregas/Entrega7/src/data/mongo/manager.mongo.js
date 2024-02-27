import User from "./models/users.model.js";
import Product from "./models/products.model.js";
import Order from "./models/orders.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";
import { Types } from "mongoose";

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
  async read({ filter, orderAndPaginate }) {
    try {
      const all = await this.model.paginate(filter, orderAndPaginate);
      //console.log(all.docs)
      //if(all.docs.length === 0){
      if (all.totalPages === 0) {
        const error = new Error("There aren't any document");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async addToCart(userId, productId, quantity) {
    try {
      const order = await this.model.create({
        userId: userId,
        productId: productId,
        quantity: quantity,
       
      });
      return order._id;
    } catch (error) {
      throw error;
    }
  }

  async removeFromCart(orderId) {
    try {
      const deletedOrder = await this.model.findByIdAndDelete(orderId);
      notFoundOne(deletedOrder);
      return deletedOrder;
    } catch (error) {
      throw error;
    }
  }

  async reportBill(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id, 0"] }, "$$ROOT"],
            },
          },
        },
        {
          $set: { subtotal: { $multiply: ["$price", "$quantity"] } },
        },
        {
          $group: {
            _id: "$user_id",
            total: { $sum: "$subtotal" },
          },
        },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
            currency: "USD",
          },
        },
        //{$merge: { into: "bills" }},
      ]);
      return report;
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
}
const users = new MongoManager(User);
const products = new MongoManager(Product);
const orders = new MongoManager(Order);

export { users, products, orders };
