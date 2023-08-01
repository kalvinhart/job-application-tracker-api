import { registerAs } from "@nestjs/config";
import { Config } from "./enums/Config";

export type BaseConfig = {
  port: number;
  jwtKey: string;
};

export default registerAs(
  Config.BASE,
  (): BaseConfig => ({
    port: parseInt(process.env.PORT, 10) || 4200,
    jwtKey: process.env.JWT_KEY,
  })
);
