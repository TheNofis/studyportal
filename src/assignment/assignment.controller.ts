import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Session,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles, Role } from 'src/common/decorators/roles.decorator';
import { ISession } from 'src/common/interfaces/session.interface';

@UseGuards(RolesGuard)
@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Get('/user')
  @Roles(Role.USER, Role.ADMIN)
  findAllForUser(@Session() session: ISession) {
    return this.assignmentService.findAllForUser(session.user.id);
  }

  @Get('/user/:id')
  @Roles(Role.USER, Role.ADMIN)
  findOneForUser(
    @Param('id') assignmentsId: string,
    @Session() session: ISession,
  ) {
    return this.assignmentService.findOneForUser(
      assignmentsId,
      session.user.id,
    );
  }

  @Get('')
  @Roles(Role.USER, Role.ADMIN)
  findAll(@Session() session: ISession) {
    return this.assignmentService.findAll(session.user.class);
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.assignmentService.delete(id);
  }
}
