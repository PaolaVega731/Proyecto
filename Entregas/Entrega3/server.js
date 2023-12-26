import express from "express";
import products from "./data/fs/files/products.fs.js";
import users from "./data/fs/files/users.fs.js";

const server = express();

const PORT = 8080;
const ready = console.log("server ready on port" + PORT);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

server.post("/api/products", async (req, res) => {
  try {
    const data = req.body;
    const response = await products.createProduct(data);
    if (response === "Title, photo, price, stock are required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        message: "created",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});
server.get("/api/products", async (req, res) => {
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
        message: "not found!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { eid } = req.params;
    const one = await products.readProductById(eid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: "not found!",
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});
server.get("/api/users", async (req, res) => {
  try {
    const all = await users.readUsers();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: "not found!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});
server.get("/api/users/:uid", async (req, res) => {
  try {
    const { eid } = req.params;
    const one = await users.readUserById(eid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: "not found!",
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});
