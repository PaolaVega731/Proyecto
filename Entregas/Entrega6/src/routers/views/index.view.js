import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.get("/home", (req, res, next) => {
  try {
    const mainProducts = ["Keyboard", "Mouse", "Notebook stand"];
    const date = new Date();
    return res.render("home", {
      products: mainProducts,
      date,
      title: "INDEX",
    });
  } catch (error) {
    next(error);
  }
});
viewsRouter.use("/real", productsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;
