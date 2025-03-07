import { Injectable } from '@nestjs/common';
import { Assignment, Assignments_User, User } from '@prisma/client';
import { Nullable } from 'src/common/interfaces/nullable.interface';
import { ISession } from 'src/common/interfaces/session.interface';
import ResponseService from 'src/common/response/response.service';
import { PrismaService } from 'src/databases/prisma/prisma.service';
import { RedisService } from 'src/databases/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    private readonly responseService: ResponseService,
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async profile(session: ISession) {
    this.responseService.start();

    const user: Nullable<User> = await this.redisService.getCachedData(
      `user:${session.user.id}`,
      async () => {
        return await this.prismaService.user.findUnique({
          where: {
            id: session.user.id,
          },
        });
      },
    );

    const userNoPassword = { ...user };
    delete userNoPassword.password;

    return this.responseService.success(userNoPassword);
  }

  async lastAction(session: ISession) {
    this.responseService.start();

    const assignments: Nullable<Assignment>[] =
      await this.redisService.getCachedData(
        `last_action:${session.user.id}`,
        async () => {
          return await this.prismaService.assignments_User.findMany({
            where: {
              userId: session.user.id,
            },
            take: 5,
          });
        },
      );

    if (assignments === null)
      return this.responseService.error('No Assignments');

    return this.responseService.success(assignments);
  }
}
