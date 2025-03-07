import { Injectable } from '@nestjs/common';
import { Assignment, Assignments_User } from '@prisma/client';
import { Nullable } from 'src/common/interfaces/nullable.interface';
import { ISession } from 'src/common/interfaces/session.interface';
import ResponseService from 'src/common/response/response.service';
import { PrismaService } from 'src/databases/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly responseService: ResponseService,
    private readonly prismaService: PrismaService,
  ) {}

  async profile(session: ISession) {
    this.responseService.start();

    const userNoPassword = {
      ...session.user,
    };
    delete userNoPassword.password;

    return this.responseService.success(userNoPassword);
  }

  async lastAction(session: ISession) {
    this.responseService.start();

    const assignments: Nullable<Assignments_User>[] =
      await this.prismaService.assignments_User.findMany({
        where: {
          userId: session.user.id,
        },
        take: 5,
      });

    if (assignments === null)
      return this.responseService.error('No Assignments');

    return this.responseService.success(assignments);
  }
}
