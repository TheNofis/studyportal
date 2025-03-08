import { Status } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsNumber()
  evaluation: number;

  @IsString()
  status?: Status;

  @IsString()
  comment?: string;
}
