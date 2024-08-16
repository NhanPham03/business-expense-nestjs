import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Claim } from './entities/claim.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  create(@Body() createClaimDto: CreateClaimDto): Promise<Claim> {
    return this.claimsService.create(createClaimDto);
  }

  @Get()
  findAll(): Promise<Claim[]> {
    return this.claimsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Claim> {
    return this.claimsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto) {
    return this.claimsService.update(id, updateClaimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimsService.remove(id);
  }
}
