import { Document, Model } from "mongoose";

declare global {
  namespace Express {}

  namespace Models {
    export type UserModel = Model<Document>;
    export type EarningsModel = Model<Document>;
    export type BudgetModel = Model<Document>;
    export type ExpensesModel = Model<Document>;
  }
}
