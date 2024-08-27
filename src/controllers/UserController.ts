import { Service } from "typedi";
@Service()
export default class UserService {
  constructor(
    private userModel: Models.UserModel // other constructors
  ) {}

  // example of function in a service/controller class
  public async getAllUsers() {
    const users = await this.userModel.find();
    return users;
  }
}
