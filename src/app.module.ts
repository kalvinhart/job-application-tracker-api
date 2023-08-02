import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import baseConfig, { BaseConfig } from "./config/base.config";
import databaseConfig from "./config/database.config";
import { JwtModule } from "@nestjs/jwt";
import { Config } from "./config/enums/Config";
import { DevtoolsModule } from "@nestjs/devtools-integration";
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { JobModule } from './modules/job/job.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [baseConfig, databaseConfig],
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<BaseConfig>(Config.BASE)?.jwtKey,
        signOptions: {
          expiresIn: "7d",
        },
      }),
      inject: [ConfigService],
      global: true,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== "production",
    }),
    AuthModule,
    UserModule,
    JobModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
