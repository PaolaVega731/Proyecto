import { Router } from "express";
//import users from "../../data/fs/users.fs.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";
import { users } from "../../data/mongo/manager.mongo.js";
import User from "../../data/mongo/models/users.model.js";

const usersRouter = Router();
const manager = users;

usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const data = req.body;
    const idUsuario = await users.create(data);

    return res.status(201).json({
      statusCode: 201,
      response: { _id: idUsuario },
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      //sort: { name: 1 },
    };
    const filter = {};
    if (req.query.email) {
      filter.email = new RegExp(req.query.email.trim(), "i");
    }
    if (req.query.email === "desc") {
      orderAndPaginate.sort.name = -1;
    }
    const all = await users.read({ filter, orderAndPaginate });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readOne(uid);
    if (!one) {
      return res.status(404).json({
        statusCode: 404,
        message: `User with ID ${uid} not found`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      response: [one],
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const dataToUpdate = req.body;
    const updatedUser = await users.update(uid, dataToUpdate);

    if (!updatedUser) {
      const error = new Error("No se encontró el usuario");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      statusCode: 200,
      response: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const deletedUser = await User.findByIdAndDelete(uid);

    return res.status(200).json({
      statusCode: 200,
      response: deletedUser,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/by-email/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await users.readByEmail(email);

    return res.json({
      statusCode: 200,
      response: user,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
