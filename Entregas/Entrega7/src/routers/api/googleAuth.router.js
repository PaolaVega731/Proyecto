import express from 'express';
import passport from 'passport';

const googleAuthRouter = express.Router();

googleAuthRouter.get(
  "/", 
  passport.authenticate("google", { scope: ["email", "profile"] })
);


googleAuthRouter.get(
  "/callback", 
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login", 
  })
);

export default googleAuthRouter;
