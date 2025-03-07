import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AssignmentModule } from './assignment/assignment.module';
import { AdminModule } from './admin/admin.module';
import { RedisService } from './databases/redis/redis.service';

@Module({
  imports: [AuthModule, UserModule, AssignmentModule, AdminModule],
  controllers: [],
  providers: [RedisService],
})
export class AppModule {}
