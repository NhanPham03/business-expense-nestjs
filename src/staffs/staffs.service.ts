import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { ObjectId, Repository } from 'typeorm';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    return await this.staffRepository.save(createStaffDto);
  }

  async findAll() {
    return await this.staffRepository.find();
  }

  async findOne(id: string) {
    return await this.staffRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    return await this.staffRepository.update({ _id: new ObjectId(id) }, updateStaffDto);
  }

  async remove(id: string) {
    return await this.staffRepository.delete({ _id: new ObjectId(id) });
  }
}
