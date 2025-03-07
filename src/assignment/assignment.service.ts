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
    const assignments = this.prismaService.assignments_User.findMany({
      where: {
        userId,
      },
    });
    this.responseService.success(assignments);
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {}

  delete(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
