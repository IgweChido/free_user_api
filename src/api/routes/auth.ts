import { Router } from "express";

const route = Router();
export default (app: Router) => {
  // initialize the main route
  app.use("/auth", route);
  // get all auth router
};
