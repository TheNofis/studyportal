import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/common/guards/roles.guard';

import { Roles, Role } from 'src/common/decorators/roles.decorator';
import { ISession } from 'src/common/interfaces/session.interface';

@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.USER)
  profile(@Session() session: ISession) {
    return this.userService.profile(session);
  }
}
