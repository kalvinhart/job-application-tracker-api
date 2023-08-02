import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";
import { ApplicationStatus } from "../enums/ApplicationStatus";
import { User } from "src/modules/user/schemas/user.schema";

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  _id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: User | string;

  @Prop({ required: true })
  title: string;

  @Prop()
  company: string;

  @Prop()
  location: string;

  @Prop({ type: String, enum: ApplicationStatus, default: ApplicationStatus.APPLIED })
  applicationStatus: ApplicationStatus;

  @Prop()
  contactName: string;

  @Prop()
  contactNumber: string;

  @Prop()
  contactEmail: string;

  @Prop()
  description: string;

  @Prop()
  salaryMin: number;

  @Prop()
  salaryMax: number;

  @Prop({ required: true })
  dateApplied: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
