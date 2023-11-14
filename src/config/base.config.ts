import { registerAs } from "@nestjs/config";
import { Config } from "./enums/Config";

export type BaseConfig = {
  port: number;
  corsOrigin: string;
  jwtKey: string;
};

export default registerAs(
  Config.BASE,
  (): BaseConfig => ({
    port: parseInt(process.env.PORT, 10) || 4200,
    corsOrigin: process.env.CORS_ORIGIN,
    jwtKey: process.env.JWT_KEY,
  })
);
