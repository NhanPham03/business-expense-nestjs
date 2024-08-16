import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles, Staff } from './entities/staff.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: MongoRepository<Staff>,
  ) {}

  // #region CREATE
  async create(createStaffDto: CreateStaffDto) {
    const staff = this.staffRepository.create({ 
      ...createStaffDto, 
      active: true,
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString(), 
    });

    return await this.staffRepository.save(staff);
  }
  // #endregion

  // #region RETRIEVE
  async findAll() {
    return await this.staffRepository.find();
  }

  async findOneById(id: string) {
    return await this.staffRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  async findOneByEmail(email: string) {
    return await this.staffRepository.findOne({ where: { email } });
  }
  // #endregion

  // #region UPDATE
  async update(id: string, updateStaffDto: UpdateStaffDto) {
    return await this.staffRepository.update({ _id: new ObjectId(id) }, { 
      ...updateStaffDto, 
      updated_at: new Date().toISOString(), 
    });
  }

  async activate(id: string) {
    return await this.staffRepository.update({ _id: new ObjectId(id) }, {
      active: true,
      updated_at: new Date().toISOString(), 
    });
  }

  async deactivate(id: string) {
    return await this.staffRepository.update({ _id: new ObjectId(id) }, {
      active: false,
      updated_at: new Date().toISOString(),
    });
  }
  // #endregion

  // #region DELETE
  // Use deactivate instead of delete
  async remove(id: string) {
    return await this.staffRepository.delete({ _id: new ObjectId(id) });
  }
  // #endregion
}
