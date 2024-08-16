import { Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Claim } from './entities/claim.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private readonly claimRepository: MongoRepository<Claim>,
  ) {}

  async create(createClaimDto: CreateClaimDto) {
    return await this.claimRepository.save(createClaimDto);
  }

  async findAll() {
    return await this.claimRepository.find();
  }

  async findOne(id: string) {
    return await this.claimRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  async update(id: string, updateClaimDto: UpdateClaimDto) {
    return await this.claimRepository.update({ _id: new ObjectId(id) }, updateClaimDto);
  }

  async remove(id: string) {
    return await this.claimRepository.delete({ _id: new ObjectId(id) });
  }
}
