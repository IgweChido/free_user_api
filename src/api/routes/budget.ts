import BudgetController from "../../controllers/BudgetController";
import budgetModel from "../../models/budget";
import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";

const route = Router();
export default (app: Router) => {
  // initialize the main route
  app.use("/budget", route);
  // get all budget router

  route.post(
    // TODO: validation validatorjs
    "/add_budget",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const budget_details = req.body;
        const budgetController = new BudgetController(budgetModel);
        const add_budget = await budgetController.addBudget(budget_details);
        res.status(200).json(add_budget);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    "/get_all_budgets",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const budgetController = new BudgetController(budgetModel);
        const get_all_budgets = await budgetController.getAllBudgets();

        res.status(200).json(get_all_budgets);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.put(
    // TODO: validation validatorjs
    "/edit_budget/:budget_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const budget_id = req.params.budget_id;

        const budget_details = req.body;

        const budgetsController = Container.get(BudgetController);
        const edit_budget = await budgetsController.editBudget(
          budget_id,
          budget_details
        );
        res.status(200).json(edit_budget);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.delete(
    "/delete_budget/:budget_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const budget_id = req.params.budget_id;
        const budgetsController = Container.get(BudgetController);
        const delete_budget = await budgetsController.deleteBudget(budget_id);
        res.status(200).json(delete_budget);
      } catch (err) {
        return next(err);
      }
    }
  );
};
