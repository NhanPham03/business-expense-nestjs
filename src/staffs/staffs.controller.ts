import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RetrieveStaffDto } from './dto/retrieve-staff.dto';

@UseGuards(JwtAuthGuard)
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  create(@Body() createStaffDto: CreateStaffDto): Promise<RetrieveStaffDto> {
    return this.staffsService.create(createStaffDto);
  }

  @Get()
  findAll(): Promise<RetrieveStaffDto[]> {
    return this.staffsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<RetrieveStaffDto> {
    return this.staffsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(id, updateStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffsService.remove(id);
  }
}
