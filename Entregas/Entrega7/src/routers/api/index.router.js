import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
//import cookiesRouter from "./cookies.router.js";
import sessionsRouter from "./sessions.router.js";
import cartRouter from "./carrito.router.js";
import googleAuthRouter from "./googleAuth.router.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
//apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/auth/google", googleAuthRouter);
apiRouter.use("/carrito", cartRouter);

export default apiRouter;
