import { User } from "src/modules/user/schemas/user.schema";
import { ApplicationStatus } from "../enums/ApplicationStatus";
import { Job } from "../schemas/job.schema";

export class JobDto {
  constructor(job: Job) {
    this._id = job._id;
    this.user = job.user;
    this.title = job.title;
    this.company = job.company;
    this.location = job.location;
    this.applicationStatus = job.applicationStatus;
    this.contactName = job.contactName;
    this.contactNumber = job.contactNumber;
    this.contactEmail = job.contactEmail;
    this.description = job.description;
    this.salaryMin = job.salaryMin;
    this.salaryMax = job.salaryMax;
    this.dateApplied = job.dateApplied;
  }

  _id: string;
  user: User | string;
  title: string;
  company: string;
  location: string;
  applicationStatus: ApplicationStatus;
  contactName: string;
  contactNumber: string;
  contactEmail: string;
  description: string;
  salaryMin: number;
  salaryMax: number;
  dateApplied: Date;
}
