import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AssignmentModule } from './assignment/assignment.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, UserModule, AssignmentModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
