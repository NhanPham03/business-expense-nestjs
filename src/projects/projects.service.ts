import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectRepository.save(createProjectDto);
  }

  async findAll() {
    return await this.projectRepository.find();
  }

  async findOne(id: string) {
    return await this.projectRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectRepository.update({ _id: new ObjectId(id) }, updateProjectDto);
  }

  async remove(id: string) {
    return await this.projectRepository.delete({ _id: new ObjectId(id) });
  }
}
