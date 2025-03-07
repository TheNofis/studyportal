import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import ResponseService from 'src/common/response/response.service';
import { PrismaService } from 'src/databases/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ResponseService, PrismaService],
})
export class UserModule {}
