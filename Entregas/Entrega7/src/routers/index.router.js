import { Router } from "express";
import apiRouter from "./api/index.router.js";
import viewsRouter from "./views/index.view.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/real", (req, res) => {
  res.render("real");
});

router.get("/products/form", (req, res) => {
  res.render("form");
});

router.get("/auth/register", (req, res) => {
  res.render("register");
});
router.get("/auth/login", (req, res) => {
  res.render("login");
});
router.get("/carrito", (req, res) => {
  res.render("carrito");
});
router.get("/orders", (req, res) => {
  res.render("orders");
});
export default router;
