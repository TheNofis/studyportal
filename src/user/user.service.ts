import { Injectable } from '@nestjs/common';
import { ISession } from 'src/common/interfaces/session.interface';
import ResponseService from 'src/common/response/response.service';

@Injectable()
export class UserService {
  constructor(private readonly responseService: ResponseService) {}

  async profile(session: ISession) {
    this.responseService.start();

    const userNoPassword = {
      ...session.user,
    };
    delete userNoPassword.password;

    return this.responseService.success(userNoPassword);
  }
}
