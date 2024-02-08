import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.get("/home", (req, res, next) => {
  try {
    const mainProducts = [
      {
        title: "Keyboard",
        photo:
          "https://th.bing.com/th/id/OIP.yH83hBFDy1cq8iNh6lTALQHaE8?rs=1&pid=ImgDetMain",
      },
      {
        title: "Mouse",
        photo:
          "https://th.bing.com/th/id/OIP.9UkmnrreEXfd6twa_HhnJgHaF3?rs=1&pid=ImgDetMain",
      },
      {
        title: "Notebook stand",
        photo:
          "https://th.bing.com/th/id/OIP.mv9ancJUbRGxsvXNBrx_kQHaHa?rs=1&pid=ImgDetMain",
      },
    ];
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
