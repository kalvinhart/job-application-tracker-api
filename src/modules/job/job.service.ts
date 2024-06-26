import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Job } from "./schemas/job.schema";
import { Model } from "mongoose";
import { CreateJobDto } from "./dto/create-job.dto";
import { JobDto } from "./dto/job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async getAllUserJobs(userId: string): Promise<JobDto[]> {
    const jobs = await this.jobModel.find({ user: userId });
    return jobs.map(job => new JobDto(job));
  }

  async createJob(userId: string, createJobDto: CreateJobDto): Promise<JobDto> {
    const newJob = new this.jobModel({ ...createJobDto, user: userId });

    const savedJob = await newJob.save();

    return new JobDto(savedJob);
  }

  async updateJob(userId: string, updateJobDto: UpdateJobDto): Promise<JobDto | null> {
    const job = await this.jobModel.findOneAndUpdate({ _id: updateJobDto._id, user: userId }, updateJobDto, {
      new: true,
      runValidators: true,
    });
    if (!job) return null;

    return new JobDto(job);
  }
}