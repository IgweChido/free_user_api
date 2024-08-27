import { Router } from "express";

import auth from "./routes/auth";
import user from "./routes/user";
import budget from "./routes/budget";
import expenses from "./routes/expenses";
import earnings from "./routes/earnings";

export default () => {
  const app = Router();

  auth(app);
  user(app);
  budget(app);
  expenses(app);
  earnings(app);

  return app;
};
