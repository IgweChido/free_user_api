import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import UserService from "../../controllers/UserController";
import userModel from "../../models/user";

const route = Router();
export default (app: Router) => {
  // initialize the main route
  app.use("/user", route);
  // get all user router

  route.post(
    // TODO: validation validatorjs
    "/add_user",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user_details = req.body;
        const userController = new UserService(userModel);
        const add_user = await userController.addUsers(user_details);
        res.status(200).json(add_user);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    "/get_all_users",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userController = new UserService(userModel);
        const get_all_user = await userController.getAllUsers(req.query);
        res.status(200).json(get_all_user);
      } catch (err) {
        return next(err);
      }
    }
  );
};
