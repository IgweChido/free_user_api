import EarningsController from "../../controllers/EarningsController";
import earningsModel from "../../models/earnings";
import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";

const route = Router();
export default (app: Router) => {
  // initialize the main route
  app.use("/earnings", route);
  // get all earnings router

  route.post(
    // TODO: validation validatorjs
    "/add_earnings",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const earnings_details = req.body;
        const earningsController = new EarningsController(earningsModel);
        const add_earnings = await earningsController.addEarnings(
          earnings_details
        );
        res.status(200).json(add_earnings);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    "/get_all_earnings",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const earningsController = new EarningsController(earningsModel);
        const get_all_earnings = await earningsController.getAllEarnings();
        res.status(200).json(get_all_earnings);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.put(
    // TODO: validation validatorjs
    "/edit_earnings/:earnings_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const earnings_id = req.params.earnings_id;
        const earnings_details = req.body;
        const earningsController = new EarningsController(earningsModel);
        const edit_earnings = await earningsController.editEarnings(
          earnings_id,
          earnings_details
        );
        res.status(200).json(edit_earnings);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.delete(
    "/delete_earnings/:earnings_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const earnings_id = req.params.earnings_id;
        const earningsController = new EarningsController(earningsModel);
        const delete_earnings = await earningsController.deleteEarnings(
          earnings_id
        );
        res.status(200).json(delete_earnings);
      } catch (err) {
        return next(err);
      }
    }
  );
};
