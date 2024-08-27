import { Service } from "typedi";
@Service()
export default class BudgetController {
  constructor(private budgetModel: Models.BudgetModel) {}

  // example of function in a service/controller class
  // async getAllUsers() {
  //   const users = await this.userModel.find();
  //   return users;
  // }
  public async addBudget(budget_details) {
    try {
      const add_budget = await this.budgetModel.create({
        title: budget_details.title,
        amount: budget_details.amount,
        category: budget_details.category,
        budget_date: budget_details.budget_date,
      });

      return {
        status: "success",
        data: add_budget,
        message: "Budget successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getAllBudgets() {
    try {
      const get_all_budgets = await this.budgetModel.find({
        $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
      });
      return {
        status: "success",
        data: get_all_budgets,
        message: "Budget successfully retireved",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async editBudget(budget_id, budget_details) {
    try {
      const IfBudgetExistsUpdate = await this.budgetModel.findOneAndUpdate(
        {
          _id: budget_id,
          $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
        },
        {
          budget_details,
        },
        {
          new: true, // Return the updated document
        }
      );

      return {
        status: "success",
        data: IfBudgetExistsUpdate,
        message: "Budget successfully edited",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async deleteBudget(budget_id) {
    try {
      const checkIfBudgetExist = await this.budgetModel.findOne({
        _id: budget_id,
        $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
      });

      if (!checkIfBudgetExist) {
        throw new Error("Budget does not exist");
      }

      await this.budgetModel.findOneAndUpdate(
        {
          _id: budget_id,
        },
        {
          is_deleted: true,
        }
      );

      return {
        status: "success",
        data: "",
        message: "Budget successfully deleted",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
