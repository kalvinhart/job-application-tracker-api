import { UserDto } from "src/modules/user/dto/user.dto";

export class SignInResultDto {
  constructor(user: UserDto, token: string) {
    this.token = token;
    this.user = user;
  }

  token: string;
  user: UserDto;
}
