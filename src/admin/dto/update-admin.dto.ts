import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @Max(5)
  @Min(0)
  @IsNumber()
  evaluation: number;

  @IsString()
  status: Status;

  @IsString()
  comment?: string;
}
