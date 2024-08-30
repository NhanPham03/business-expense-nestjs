import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { hash } from 'bcrypt';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: MongoRepository<Staff>,
  ) {}

  // #region CREATE
  async create(createStaffDto: CreateStaffDto) {
    try {
      const hashedPassword = await hash(createStaffDto.password, 10);

      const staff = this.staffRepository.create({ 
        ...createStaffDto, 
        password: hashedPassword, // Hash with bcrypt
        active: true,
        created_at: new Date().toISOString(), 
        updated_at: new Date().toISOString(), 
      });

      return await this.staffRepository.save(staff);
    } catch (error) {
      if (error.code === 11000) throw new BadRequestException("Email is already taken");
      throw error;
    }
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
    const updateData: Partial<Staff> = {
      ...updateStaffDto,
      updated_at: new Date().toISOString(),
    }
    
    if (updateStaffDto.password) {
      updateData.password = await hash(updateStaffDto.password, 10);
    }

    return await this.staffRepository.update({ _id: new ObjectId(id) }, updateData);
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
