import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import ExpensesController from "../../controllers/ExpensesController";
import expensesModel from "../../models/expenses";

const route = Router();
export default (app: Router) => {
  // initialize the main route
  app.use("/expenses", route);
  // get all expenses router

  // Example of route
  // route.get("/", async (req: Request, res: Response,next: NextFunction) => {
  //   try {

  //     res.status(200).json("");
  //   } catch (err) {
  //      return next(err);
  //   }
  // });

  // categories
  // -food
  // -transportation
  // -airtime/data
  // - electricity
  // - subscriptions: gym, spotify
  // - savings
  // - toiletry
  // - utility
  // clothing
  // other

  route.post(
    // TODO: validation validatorjs
    "/add_expenses",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const expenses_details = req.body;
        const expensesController = new ExpensesController(expensesModel);
        const add_expenses = await expensesController.addExpenses(
          expenses_details
        );
        res.status(200).json(add_expenses);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    "/get_all_expenses",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const expensesController = new ExpensesController(expensesModel);
        const get_all_expenses = await expensesController.getAllExpenses();
        res.status(200).json(get_all_expenses);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    "/get_all_expenses_categories",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const expensesController = new ExpensesController(expensesModel);
        const get_all_expenses_categories =
          await expensesController.getAllExpensesCategories();
        res.status(200).json(get_all_expenses_categories);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.put(
    // TODO: validation validatorjs
    "/edit_expense/:expense_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const expense_id = req.params.expense_id;
        const expenses_details = req.body;
        const expensesController = Container.get(ExpensesController);
        const edit_expense = await expensesController.editExpense(
          expense_id,
          expenses_details
        );
        res.status(200).json(edit_expense);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.delete(
    "/delete_expense/:expense_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const expense_id = req.params.expense_id;
        const expensesController = Container.get(ExpensesController);
        const delete_expense = await expensesController.deleteExpense(
          expense_id
        );
        res.status(200).json(delete_expense);
      } catch (err) {
        return next(err);
      }
    }
  );
};
