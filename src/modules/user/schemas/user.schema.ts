import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({
    required: true,
    minlength: 6,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
