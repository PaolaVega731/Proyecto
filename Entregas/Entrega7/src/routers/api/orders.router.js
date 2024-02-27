import mongoose from "mongoose";
import { Router } from "express";
import propsOrders from "../../middlewares/propsOrders.mid.js";
//import order from "../../data/fs/orders.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
//import OrderManager from "../../data/memory/orders.memory.js";
const ordersRouter = Router();

ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    const data = req.body;

    const response = await orders.create(data);

    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
ordersRouter.post("/carrito/agregar", async (req, res, next) => {
  try {
    const { productId, cantidad } = req.body; 

    
    if (!productId || !cantidad || isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({ statusCode: 400, message: "Bad request" });
    }

    const order = await orders.create({
      productId: productId,
      cantidad: cantidad,
     
    });

    return res.status(201).json({ statusCode: 201, message: "Product added to cart", order });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/bills/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const repost = await orders.reportBill(uid);
    return res.json({
      statusCode: 200,
      response: report,
    });
  } catch (error) {
    return next(error);
  }
});
ordersRouter.get("/", async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }
    const allOrders = await orders.read({ filter });
    return res.json({
      statusCode: 200,
      response: allOrders,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await orders.readOne(oid);

    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return res.json({
      statusCode: 404,
      message: error.message,
    });
  }
});
ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await orders.destroy(oid);

    if (response === "Order not found") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});
ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const { quantity, state } = req.body;

    const updatedOrder = await orders.update(oid, quantity, state);

    return res.json({
      statusCode: 200,
      response: updatedOrder,
    });
  } catch (error) {
    return res.json({
      statusCode: 404,
      message: error.message,
    });
  }
});

export default ordersRouter;
