import { User } from "../schemas/user.schema";

export class UserDto {
  constructor(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
  }

  _id: string;
  name: string;
  email: string;
}
