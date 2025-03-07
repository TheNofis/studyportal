import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content?: string;

  @IsString()
  module: string;

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Deadline must be a valid date' })
  deadlineAt: Date;
}
