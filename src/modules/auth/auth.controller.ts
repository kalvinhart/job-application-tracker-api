import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInResultDto } from "./dto/sign-in-result.dto";
import { SignInDto } from "./dto/sign-in.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResultDto> {
    return await this.authService.signIn(signInDto);
  }

  @Post("register")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<SignInResultDto> {
    return await this.authService.createUser(createUserDto);
  }
}
