import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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
    return this.adminService.createAssignmentForUser(id, userId, dto);
  }

  @Patch('assignment/:id/:userId')
  @Roles(Role.ADMIN)
  updateAssignmentForUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateAdminDto,
  ) {
    return this.adminService.updateAssignmentForUser(id, userId, dto);
  }

  @Get('assignment/:id')
  @Roles(Role.ADMIN)
  getAssignmentForUser(@Param('id') id: string) {
    return this.adminService.getAssignmentForUser(id);
  }

  @Get('assignments')
  @Roles(Role.ADMIN)
  getAssignments() {
    return this.adminService.getAssignments();
  }

  @Get('information')
  @Roles(Role.ADMIN)
  getInformation() {
    return this.adminService.getInformation();
  }


  @Get('students')
  @Roles(Role.ADMIN)
  getStudents() {
    return this.adminService.getStudents();
  }
}
