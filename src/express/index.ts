import { Document, Model } from "mongoose";

declare global {
  namespace Express {}

  namespace Models {
    export type UserModel = Model<Document>;
  }
}
