import { Router } from "express";

const route = Router();
export default (app: Router) => {
  // initialize the main route
  app.use("/user", route);
  // get all user router
};
