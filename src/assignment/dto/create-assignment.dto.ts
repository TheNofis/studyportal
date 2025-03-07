import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export interface IAttachment {
  title: string;
  description: string;
  url: string;
}

export class CreateAssignmentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content?: string;

  @IsString()
  module: string;

  @IsArray()
  attachments: IAttachment[];

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Deadline must be a valid date' })
  deadlineAt: Date;
}
