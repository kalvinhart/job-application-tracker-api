import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { Request } from "express";
import { JobDto } from "./dto/job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("jobs")
export class JobController {
  constructor(private jobService: JobService) {}

  @ApiResponse({ status: 200, description: "Retrieve all user jobs" })
  @Get("")
  async getAllUserJobs(@Req() request: Request): Promise<JobDto[]> {
    const { user } = request;

    return await this.jobService.getAllUserJobs(user._id);
  }

  @ApiResponse({ status: 201, description: "Create a new job" })
  @Post("")
  async createJob(@Body() createJobDto: CreateJobDto, @Req() request: Request): Promise<JobDto> {
    const { user } = request;

    return await this.jobService.createJob(user._id, createJobDto);
  }

  @ApiResponse({ status: 200, description: "Update a job" })
  @Put("")
  async updateJob(@Body() updateJobDto: UpdateJobDto, @Req() request: Request): Promise<JobDto> {
    const { user } = request;

    return await this.jobService.updateJob(user._id, updateJobDto);
  }
}
