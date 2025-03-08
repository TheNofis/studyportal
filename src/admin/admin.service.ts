import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import ResponseService, {
  IResponse,
} from 'src/common/response/response.service';
import { PrismaService } from 'src/databases/prisma/prisma.service';
import { Assignment, Assignment_User, Role, User } from '@prisma/client';
import { Nullable } from 'src/common/interfaces/nullable.interface';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  async createAssignmentForUser(
    assignmentId: string,
    userId: string,
    dto: CreateAdminDto,
  ): Promise<IResponse> {
    this.responseService.start();

    const assignmentUser: Assignment_User =
      await this.prismaService.assignment_User.create({
        data: {
          assignmentId,
          userId,
          evaluation: dto.evaluation,
          status: dto.status,
          comment: dto.comment,
        },
      });

    return this.responseService.success(assignmentUser);
  }

  async updateAssignmentForUser(
    assignmentId: string,
    userId: string,
    dto: UpdateAdminDto,
  ): Promise<IResponse> {
    this.responseService.start();

    const assignmentUser: Assignment_User =
      await this.prismaService.assignment_User.update({
        where: {
          assignmentId_userId: {
            assignmentId,
            userId,
          },
        },
        data: {
          evaluation: dto.evaluation,
          status: dto.status,
          comment: dto.comment,
        },
      });

    return this.responseService.success(assignmentUser);
  }

  // TODO: change the ROLE
  async getStudents(): Promise<IResponse> {
    this.responseService.start();

    const students = (
      await this.prismaService.user.findMany({
        where: { role: Role.admin },
        include: { assignments: { select: { evaluation: true } } },
      })
    ).map((student: User & { assignments: Assignment_User[] }) => {
      const { password, assignments, ...newStudent } = student;

      return {
        ...newStudent,
        average:
          student.assignments
            .map((assignment) => assignment.evaluation)
            .reduce((a, b) => a + b, 0) / student.assignments.length,
      };
    });

    return this.responseService.success(students);
  }

  async getAssignmentForUser(id: string): Promise<IResponse> {
    this.responseService.start();

    const assignmentWithUsers: Nullable<
      Assignment & { users: Assignment_User[] }
    > = await this.prismaService.assignment.findUnique({
      where: { id },
      include: { users: true },
    });

    return this.responseService.success(assignmentWithUsers || []);
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
