import config from "../config";
import { Db } from "mongodb";
import mongoose from "mongoose";
export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL);
  return connection.connection.db;
};
