import { Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Claim } from './entities/claim.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private readonly claimRepository: Repository<Claim>,
  ) {}

  async create(createClaimDto: CreateClaimDto) {
    return await this.claimRepository.save(createClaimDto);
  }

  findAll() {
    return `This action returns all claims`;
  }

  findOne(id: number) {
    return `This action returns a #${id} claim`;
  }

  update(id: number, updateClaimDto: UpdateClaimDto) {
    return `This action updates a #${id} claim`;
  }

  remove(id: number) {
    return `This action removes a #${id} claim`;
  }
}
