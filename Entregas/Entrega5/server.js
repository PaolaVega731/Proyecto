import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import products from "./src/data/fs/products.fs.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import propsProducts from "./src/middlewares/propsProducts.mid.js";
import propsUsers from "./src/middlewares/propsUsers.mid.js";
import propsOrders from "./src/middlewares/propsOrders.mid.js";
import __dirname from "./utils.js";

// Crear servidor express
const app = express();
const PORT = 8080;

// Crear servidor HTTP y WebSocket
const httpServer = createServer(app);
const io = new Server(httpServer);

// Configurar handlebars y directorio de vistas
app.engine("handlebars", engine({ extname: ".handlebars" }));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

// Middleware para manejar variables locales
app.use((req, res, next) => {
  res.locals.isHome = req.path === "/home";
  next();
});

// Middleware para parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de registro de solicitudes
app.use(morgan("dev"));

// Middleware para servir archivos estáticos
app.use(express.static("public"));

// Endpoint para manejar el registro de usuarios
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  res.send(`User registered: ${username}`);
});

// Rutas principales
app.use("/", router);

// Manejar errores
app.use(errorHandler);

// Manejar rutas no encontradas
app.use(pathHandler);

// Middleware para productos
app.use(propsProducts);

// Middleware para usuarios
app.use(propsUsers);

// Middleware para órdenes
app.use(propsOrders);

// Manejar la conexión del socket
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);
  socket.emit("welcome", "Welcome to my App!");
  socket.emit("products", products.readProducts());

  socket.on("newProduct", async (data) => {
    try {
      console.log(data);
      await products.createProduct(data);
      const updatedProducts = products.readProducts();
      console.log("Updated products:", updatedProducts);
      socket.emit("products", updatedProducts);
    } catch (error) {
      console.log(error);
    }
  });
});

// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
