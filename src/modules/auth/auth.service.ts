import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseConfig } from "src/config/base.config";
import { Config } from "src/config/enums/Config";
import { User, UserDocument } from "../user/schemas/user.schema";
import { compareSync, hashSync } from "bcrypt";
import { UserDto } from "../user/dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInResultDto } from "./dto/sign-in-result.dto";
import { SignInDto } from "./dto/sign-in.dto";

@Injectable()
export class AuthService {
  baseConfig: BaseConfig;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.baseConfig = this.configService.get<BaseConfig>(Config.BASE);
  }

  async createUser(createUserDto: CreateUserDto): Promise<SignInResultDto> {
    const { email, password } = createUserDto;

    await this.ensureUniqueUser(email);

    const passwordHash = this.hashPassword(password);

    const newUser = new this.userModel({
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    const token = await this.jwtService.signAsync(savedUser.toObject(), {
      secret: this.baseConfig.jwtKey,
    });

    const userResult = new UserDto(savedUser);

    return new SignInResultDto(userResult, token);
  }

  hashPassword(password: string): string {
    return hashSync(password, 12);
  }

  async ensureUniqueUser(email: string): Promise<void> {
    const existingUser: UserDocument = await this.userModel.findOne({ email });
    if (existingUser) throw new BadRequestException("A user with this email address already exists.");
  }

  async signIn(userCredentials: SignInDto): Promise<SignInResultDto> {
    const { email, password } = userCredentials;

    const user: UserDocument = await this.userModel.findOne({ email }).lean();
    if (!user) throw new UnauthorizedException("Invalid username/password.");

    const match = compareSync(password, user.password);
    if (!match) throw new UnauthorizedException("Invalid username/password.");

    const token = await this.jwtService.signAsync(user, {
      secret: this.baseConfig.jwtKey,
    });

    const userResult = new UserDto(user);

    return new SignInResultDto(userResult, token);
  }
}
