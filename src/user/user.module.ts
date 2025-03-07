import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import ResponseService from 'src/common/response/response.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ResponseService],
})
export class UserModule {}
