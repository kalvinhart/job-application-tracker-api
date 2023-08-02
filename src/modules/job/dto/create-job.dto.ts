import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsPositive, MaxLength, MinLength } from "class-validator";

export class CreateJobDto {
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsOptional()
  @MinLength(2)
  company?: string;

  @IsOptional()
  @MinLength(2)
  location?: string;

  contactName?: string;

  @IsOptional()
  @MaxLength(11)
  contactNumber?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  description?: string;

  @IsOptional()
  @IsPositive()
  salaryMin?: number;

  @IsOptional()
  @IsPositive()
  salaryMax?: number;

  @IsDate()
  dateApplied: Date;
}
