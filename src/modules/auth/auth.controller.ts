import {BadRequestException, Body, Controller, Get, Post, Res, UnauthorizedException} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { UserDto } from "../user/dto/user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async signIn(
      @Body() signInDto: SignInDto,
      @Res({ passthrough: true }) response: Response
  ): Promise<UserDto> {
    try {
      const { token, user } = await this.authService.signIn(signInDto);

      response.cookie("auth-token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 3,
        sameSite: "none",
        secure: true,
      });

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post("register")
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<UserDto> {
    try {
      const { token, user } = await this.authService.createUser(createUserDto);

      response.cookie("auth-token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 3,
        sameSite: "none",
        secure: true,
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get("logout")
  logout(@Res({ passthrough: true }) response: Response): { success: boolean } {
    response.cookie("auth-token", "", {
      httpOnly: true,
      expires: new Date(1),
      sameSite: "none",
      secure: true,
    });

    return { success: true };
  }
}