import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { PrismaService } from 'src/databases/prisma/prisma.service';
import ResponseService from 'src/common/response/response.service';

@Module({
  controllers: [AssignmentController],
  providers: [AssignmentService, ResponseService, PrismaService],
})
export class AssignmentModule {}
