import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Roles } from 'src/common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('assignment/:id/:userId')
  @Roles(Role.ADMIN)
  createAssignmentForUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() dto: CreateAdminDto,
  ) {
    return this.adminService.create(id, userId, dto);
  }

  @Patch('assignment/:id/:userId')
  @Roles(Role.ADMIN)
  updateAssignmentForUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateAdminDto,
  ) {
    return this.adminService.update(id, userId, dto);
  }

  @Get('assignment/:id')
  @Roles(Role.ADMIN)
  findAssignmentWithUsers(@Param('id') id: string) {
    return this.adminService.findAssignmentWithUsers(id);
  }

  @Get('students')
  @Roles(Role.ADMIN)
  findAllStudents() {
    return this.adminService.getAllStudents();
  }
}
