import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", async (req, res, next) => {
  try {
    const { modo } = req.params;
    const maxAge = 60000 * 5;
    const signed = true;
    return res
      .cookie("modo", modo, { maxAge })
      .cookie("sessionId", "hola1234", { maxAge, signed })
      .json({
        statusCode: 200,
        message: "Cookie configurada - Modo: " + modo,
      });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/get", async (req, res, next) => {
  try {
    const modo = req.cookies.modo;
    const sessionId = req.signedCookies.sessionId;
    return res.json({
      statusCode: 200,
      response: {
        modo,
        sessionId,
      },
    });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/clear", async (req, res, next) => {
  try {
    return res
      .clearCookie("modo")
      .clearCookie("sessionId")
      .json({
        statusCode: 200,
        response: {
          modo: req.cookies.modo,
          sessionId: req.signedCookies.sessionId,
        },
      });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;
