import { Router } from "express";

const cartRouter = Router();

cartRouter.post("/add-to-cart", async (req, res, next) => {
  try {
    const product = req.body.product;
    req.session.cart.push(product);
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/eliminar", async (req, res, next) => {
  try {
   
    res.json({ message: "Product removed from cart" });
  } catch (error) {
    next(error);
  }
});

export default cartRouter;
