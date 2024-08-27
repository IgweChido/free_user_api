import { Service } from "typedi";
import { parseUserFilter } from "../services/filter";
@Service()
export default class UserService {
  constructor(private userModel) {}

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
      const { name_sort, age_sort } = query;

      const sort: any = {};

      // Conditionally add sorting by name if query.name_sort is true
      if (name_sort)
        if (JSON.parse(name_sort)) {
          sort["name.first"] = 1; // Sort by first name in ascending order
          sort["name.last"] = 1; // Sort by last name in ascending order
        }
      if (age_sort)
        if (JSON.parse(age_sort)) {
          // Always sort by age in increasing order
          sort["dob.age"] = 1;
        }

      sort["createdAt"] = -1;
      const users = await this.userModel.aggregate([
        {
          $match: filters.match_filter,
        },
        {
          $facet: {
            users: [
              {
                $sort: sort,
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
