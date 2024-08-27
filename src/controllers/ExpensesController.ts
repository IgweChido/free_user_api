import { Model } from "mongoose";
import { Service } from "typedi";
import NodeCache from "node-cache";

const myCache = new NodeCache();

@Service()
export default class ExpensesController {
  constructor(
    private expensesModel: Models.ExpensesModel // other constructors
  ) {}

  // example of function in a service/controller class
  // public async addExpenses() {
  //   try {

  // return {
  //   status: "success",
  //   data: "",
  //   message: "",
  //   code: 200,
  // };
  //   }

  //   catch (e) {
  //     throw new Error(e)
  //   }
  // }

  public async addExpenses(expenses_details) {
    console.log("entering expense");
    try {
      // add to the db
      const add_expenses = await this.expensesModel.create({
        title: expenses_details.title,
        amount: expenses_details.amount,
        category: expenses_details.category,
        description: expenses_details.description,
        date_spent: expenses_details.date_spent,
      });

      // add to the cache
      // Update the cache with the new expense
      let allExpenses = myCache.get("all-expense");

      console.log("all expenses", allExpenses);

      if (allExpenses) {
        // If all-expenses is in cache, update it
        // @ts-ignore
        allExpenses.push(add_expenses);
        myCache.set("all-expense", allExpenses);
        console.log("has expenses", myCache.get("all-expense"));
      } else {
        // If the cache is empty, only cache the new expense
        myCache.set("all-expense", [add_expenses]);
        console.log("has expenses", myCache.get("all-expense"));
      }

      return {
        status: "success",
        data: add_expenses,
        message: "Expense successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getAllExpenses() {
    try {
      let get_all_expenses;

      if (myCache.has("all-expense")) {
        get_all_expenses = myCache.get("all-expense");
        console.log("Value present in cache,");
      } else {
        get_all_expenses = await this.expensesModel.find({
          $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
        });
        myCache.set("all-expense", get_all_expenses);
        console.log("Value not present in cache," + " performing computation");
      }

      return {
        status: "success",
        data: get_all_expenses,
        message: "Expense successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getAllExpensesCategories() {
    try {
      const get_all_expenses = await this.expensesModel.find({
        $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
      });
      return {
        status: "success",
        data: get_all_expenses,
        message: "Expense successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async editExpense(expense_id, expenses_details) {
    try {
      const IfExpenseExistsUpdate = await this.expensesModel.findOneAndUpdate(
        {
          _id: expense_id,
          $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
        },
        {
          expenses_details,
        },
        {
          new: true,
        }
      );

      return {
        status: "success",
        data: IfExpenseExistsUpdate,
        message: "Expense successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async deleteExpense(expense_id) {
    try {
      const checkIfExpenseExist = await this.expensesModel.findOne({
        _id: expense_id,
        $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
      });

      if (!checkIfExpenseExist) {
        throw new Error("Expense does not exist");
      }

      await this.expensesModel.findOneAndUpdate(
        {
          _id: expense_id,
        },
        {
          is_deleted: true,
        }
      );

      return {
        status: "success",
        data: "",
        message: "Expense successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
