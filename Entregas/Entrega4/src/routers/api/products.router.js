import { Router } from "express";
import products from "../../data/fs/products.fs.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.createProduct(data);
    if (response === "Title, photo, price & stock are required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.readProducts();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readProducts(pid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.put("/api/products", async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const response = await products.soldProduct(quantity, pid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "stock available:" + response,
      });
    } else if (response === " There isn't any products") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.removeProductById(pid);
    if (response === " There isn't any product") {
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
productsRouter.put("/:pid", propsProducts, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const updatedProduct = await products.updateProduct(pid, newData);

    return res.json({
      statusCode: 200,
      response: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
