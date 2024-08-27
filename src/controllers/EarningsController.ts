import { Service } from "typedi";
@Service()
export default class EarningsController {
  constructor(
    private earningsModel: Models.EarningsModel // other constructors
  ) {}

  // example of function in a service/controller class
  // async getAllUsers() {
  //   const users = await this.userModel.find();
  //   return users;
  // }
  public async addEarnings(earnings_details) {
    try {
      const add_earnings = await this.earningsModel.create({
        title: earnings_details.title,
        amount: earnings_details.amount,

        description: earnings_details.description,
        date_earned: earnings_details.date_earned,
        date_for: earnings_details.date_for,
      });

      return {
        status: "success",
        data: add_earnings,
        message: "earnings successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getAllEarnings() {
    try {
      const get_all_earnings = await this.earningsModel.find({
        $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
      });
      return {
        status: "success",
        data: get_all_earnings,
        message: "earnings successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async editEarnings(earnings_id, earnings_details) {
    try {
      const IfearningsExistsUpdate = await this.earningsModel.findOneAndUpdate(
        {
          _id: earnings_id,
          $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
        },
        {
          earnings_details,
        },
        {
          new: true, // Return the updated document
        }
      );

      return {
        status: "success",
        data: IfearningsExistsUpdate,
        message: "earnings successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async deleteEarnings(earnings_id) {
    try {
      const checkIfearningsExist = await this.earningsModel.findOne({
        _id: earnings_id,
        $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
      });

      if (!checkIfearningsExist) {
        throw new Error("earnings does not exist");
      }

      await this.earningsModel.findOneAndUpdate(
        {
          _id: earnings_id,
        },
        {
          is_deleted: true,
        }
      );

      return {
        status: "success",
        data: "",
        message: "earnings successfully created",
        code: 200,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
