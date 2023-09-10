import { Transform } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from "class-validator";

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  company: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== "")
  @MinLength(2)
  location?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== "")
  @IsString()
  contactName?: string;

  @ValidateIf((_, value) => value !== "")
  @MaxLength(11)
  contactNumber?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== "")
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== "")
  @IsString()
  description?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== "")
  @IsPositive()
  salaryMin?: number;

  @IsOptional()
  @ValidateIf((_, value) => value !== "")
  @IsPositive()
  salaryMax?: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateApplied: Date;
}
