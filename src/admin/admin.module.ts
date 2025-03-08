import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import ResponseService from 'src/common/response/response.service';
import { PrismaService } from 'src/databases/prisma/prisma.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, ResponseService, PrismaService],
})
export class AdminModule {}
