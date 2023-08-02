import { IsDate, IsEmail, IsMongoId, IsOptional, IsPositive, MaxLength, MinLength } from "class-validator";

export class UpdateJobDto {
  @IsMongoId()
  _id: string;

  @IsOptional()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @MinLength(2)
  company?: string;

  @IsOptional()
  @MinLength(2)
  location?: string;

  @IsOptional()
  @MinLength(3)
  contactName?: string;

  @IsOptional()
  @MaxLength(11)
  contactNumber?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @MinLength(3)
  description?: string;

  @IsOptional()
  @IsPositive()
  salaryMin?: number;

  @IsOptional()
  @IsPositive()
  salaryMax?: number;

  @IsOptional()
  @IsDate()
  dateApplied?: Date;
}
