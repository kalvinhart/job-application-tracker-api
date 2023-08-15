import { User } from "../schemas/user.schema";

export class UserDto {
  constructor(user: User) {
    this._id = user._id;
    this.email = user.email;
  }

  _id: string;
  email: string;
}
