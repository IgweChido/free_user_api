import { Service } from "typedi";
import { parseUserFilter } from "../services/filter";
@Service()
export default class UserService {
  constructor(
    private userModel: Models.UserModel // other constructors
  ) {}

  // example of function in a service/controller class

  public async addUsers(user_details) {
    try {
      console.log("user_details", user_details);
      const add_user = await this.userModel.create(user_details);

      return {
        status: "success",
        data: add_user,
        message: "User successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getAllUsers(query) {
    try {
      const filters = parseUserFilter(query);
      const users = await this.userModel.aggregate([
        {
          $match: filters.match_filter,
        },
        {
          $facet: {
            users: [
              {
                $sort: { createdAt: -1 },
              },
              {
                $skip: filters.count * filters.page,
              },
              {
                $limit: filters.count,
              },
            ],
            total_users: [{ $match: {} }],
          },
        },
        {
          $project: {
            users: "$users",
            total_users: { $size: "$total_users" },
          },
        },
      ]);
      return {
        status: "success",
        results: users,
        message: "User successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
