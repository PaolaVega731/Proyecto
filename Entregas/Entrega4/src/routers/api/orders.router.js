import { Router } from "express";
import propsOrders from "../../middlewares/propsOrders.mid.js";
import orders from "../../data/fs/orders.fs.js";
const ordersRouter = Router();

ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await OrderManager.createOrder(data);

    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const userOrders = await orders.readOne(oid);

    if (Array.isArray(userOrders)) {
      return res.json({
        statusCode: 200,
        response: userOrders,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: userOrders,
      });
    }
  } catch (error) {
    return next(error);
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

export default ordersRouter;
