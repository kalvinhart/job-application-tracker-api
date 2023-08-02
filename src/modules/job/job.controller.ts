import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { Request } from "express";
import { JobDto } from "./dto/job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { ApiResponse } from "@nestjs/swagger";

@Controller("job")
export class JobController {
  constructor(private jobService: JobService) {}

  @ApiResponse({ status: 201, description: "Job created." })
  @Post("")
  async createJob(@Body() createJobDto: CreateJobDto, @Req() request: Request): Promise<JobDto> {
    const { user } = request;

    return await this.jobService.createJob(user._id, createJobDto);
  }

  @ApiResponse({ status: 200, description: "Job updated." })
  @Put("")
  async updateJob(@Body() updateJobDto: UpdateJobDto, @Req() request: Request): Promise<JobDto> {
    const { user } = request;

    return await this.jobService.updateJob(user._id, updateJobDto);
  }
}
