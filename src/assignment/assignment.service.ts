import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { PrismaService } from 'src/databases/prisma/prisma.service';
import ResponseService from 'src/common/response/response.service';

@Injectable()
export class AssignmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    this.responseService.start();

    await this.prismaService.assignment.create({
      data: {
        title: createAssignmentDto.title,
        description: createAssignmentDto.description,
        content: createAssignmentDto.content,
        module: createAssignmentDto.module,
        tags: createAssignmentDto.tags,
        deadlineAt: createAssignmentDto.deadlineAt,
      },
    });

    return this.responseService.success();
  }

  async findAllForUser(userId: string) {
    this.responseService.start();

    const assignments = await this.prismaService.assignments_User.findMany({
      where: {
        userId,
      },
    });

    this.responseService.success(assignments);
  }

  async findOneForUser(assignmentsId: string, userId: string) {
    this.responseService.start();

    const assignment = await this.prismaService.assignments_User.findFirst({
      where: {
        assignmentsId,
        userId
      },
    });

    this.responseService.success(assignment);
  }

  update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    this.responseService.start()

    const updatedAssignment = this.prismaService.assignment.update({
      where: {
        id
      },
      data: {
        ...updateAssignmentDto
      }
    })

    return this.responseService.success(updatedAssignment)
  }

  async delete(id: string) {
    this.responseService.start()

    await this.prismaService.assignment.delete({
      where: {
        id
      }
    })

    this.responseService.success()
  }
}
