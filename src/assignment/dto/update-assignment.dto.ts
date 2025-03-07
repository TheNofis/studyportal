import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignmentDto } from './create-assignment.dto';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export interface IAttachment {
  title: string;
  description: string;
  url: string;
}

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  module?: string;

  @IsArray()
  @IsOptional()
  attachments: IAttachment[];

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Deadline must be a valid date' })
  @IsOptional()
  deadlineAt?: Date;
}
