import { Controller, Get, NotFoundException, Req } from "@nestjs/common";
import { Request } from "express";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  async getUserDetails(@Req() request: Request): Promise<UserDto> {
    const { user } = request;

    const userDetails = await this.userService.getUserById(user._id);
    if (!userDetails) throw new NotFoundException("User not found.");

    return new UserDto(userDetails);
  }
}