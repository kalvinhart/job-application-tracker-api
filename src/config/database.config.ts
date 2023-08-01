import { registerAs } from "@nestjs/config";
import { Config } from "./enums/Config";

export type DatabaseConfig = {
  host: string;
};

export default registerAs(
  Config.DATABASE,
  (): DatabaseConfig => ({
    host: process.env.MONGO_URI,
  })
);
