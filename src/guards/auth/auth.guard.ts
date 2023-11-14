import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/modules/user/schemas/user.schema";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);

    if (!token) throw new UnauthorizedException();

    try {
      const userPayload: User = await this.jwtService.verifyAsync(token);
      request.user = userPayload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractTokenFromCookie(request: Request): string {
    return request.cookies["auth-token"] || "";
  }
}
