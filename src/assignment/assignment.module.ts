import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';

@Module({
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
