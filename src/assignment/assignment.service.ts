import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { PrismaService } from 'src/databases/prisma/prisma.service';
import ResponseService, {
  IResponse,
} from 'src/common/response/response.service';
import { Assignment, Assignments_User } from '@prisma/client';
import { Nullable } from 'src/common/interfaces/nullable.interface';

@Injectable()
export class AssignmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  async create(dto: CreateAssignmentDto): Promise<IResponse> {
    this.responseService.start();

    const assignment: Assignment = await this.prismaService.assignment.create({
      data: {
        title: dto.title,
        description: dto.description,
        content: dto.content,
        module: dto.module,
        attachments: dto.attachments ? JSON.stringify(dto.attachments) : '[]',
        tags: dto.tags || [],
        deadlineAt: dto.deadlineAt,
      },
    });

    return this.responseService.success({
      ...assignment,
      attachments: JSON.parse(assignment.attachments || '[]'),
    });
  }

  async findAll(className: string): Promise<IResponse> {
    this.responseService.start();

    const assignments: Assignment[] = (
      await this.prismaService.assignment.findMany({
        where: { class: className },
      })
    ).map((assignment: Assignment) => ({
      ...assignment,
      attachments: JSON.parse(assignment.attachments || '[]'),
    }));

    return this.responseService.success(assignments);
  }

  async findOne(id: string): Promise<IResponse> {
    this.responseService.start();

    const assignment: Nullable<Assignment> =
      await this.prismaService.assignment.findFirst({
        where: {
          id,
        },
      });

    if (assignment === null) return this.responseService.success([]);

    return this.responseService.success({
      ...assignment,
      attachments: JSON.parse(assignment.attachments || '[]'),
    });
  }

  async findAllForUser(userId: string): Promise<IResponse> {
    this.responseService.start();

    const assignments: Assignments_User[] =
      await this.prismaService.assignments_User.findMany({
        where: { userId },
      });

    return this.responseService.success(assignments);
  }

  async findOneForUser(
    assignmentsId: string,
    userId: string,
  ): Promise<IResponse> {
    this.responseService.start();

    const assignment: Nullable<Assignments_User> =
      await this.prismaService.assignments_User.findFirst({
        where: {
          assignmentsId,
          userId,
        },
      });

    return this.responseService.success(assignment);
  }

  async update(id: string, dto: UpdateAssignmentDto): Promise<IResponse> {
    this.responseService.start();

    const updatedAssignment = await this.prismaService.assignment.update({
      where: { id },
      data: {
        ...dto,
        attachments: dto.attachments ? JSON.stringify(dto.attachments) : '[]',
      },
    });

    return this.responseService.success({
      ...updatedAssignment,
      attachments: JSON.parse(updatedAssignment.attachments || '[]'),
    });
  }

  async delete(id: string): Promise<IResponse> {
    this.responseService.start();

    await this.prismaService.assignment.delete({
      where: { id },
    });

    return this.responseService.success();
  }
}
