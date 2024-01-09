import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import propsProducts from "./src/middlewares/propsProducts.mid.js";
import propsUsers from "./src/middlewares/propsUsers.mid.js";
import propsOrders from "./src/middlewares/propsOrders.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";

const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

server.listen(PORT, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
server.use(propsProducts);
server.use(propsUsers);
server.use(propsOrders);
