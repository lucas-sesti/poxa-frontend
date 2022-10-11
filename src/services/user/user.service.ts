import { BaseService } from "services/base.service";
import { User, UserParams } from "models/user";

class UserService extends BaseService<User> {
  constructor() {
    super("users");
  }

  public async createUser(data: UserParams): Promise<User> {
    return this.create(data, { public: true });
  }
}

export const userService = new UserService();
