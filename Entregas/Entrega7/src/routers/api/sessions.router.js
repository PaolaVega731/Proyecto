import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  has8char,
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 401,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);
sessionsRouter.post(
  "/login",
  has8char,
  isValidPass,
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        token: req.token,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//google
sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
//google-callback
sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

sessionsRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "Session with email: " + req.session.email,
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}),
  sessionsRouter.post("/signout", async (req, res, next) => {
    try {
      if (req.session.email) {
        req.session.destroy();
        return res.json({
          statusCode: 200,
          message: "Signed out!",
        });
      } else {
        const error = new Error("Bad Auth");
        error.statusCode = 401;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  });

//badauth

sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
