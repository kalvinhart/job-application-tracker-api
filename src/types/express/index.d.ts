// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from "express";
import { User } from "src/modules/user/schemas/user.schema";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
