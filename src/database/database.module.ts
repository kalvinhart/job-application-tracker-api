import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseConfig } from "src/config/database.config";
import { Config } from "src/config/enums/Config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<DatabaseConfig>(Config.DATABASE).host,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
