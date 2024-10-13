import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '../commons/base.service';
import { IDOProject } from './ido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIDODto } from './dto/ido.dto';

@Injectable()
export class IdoService extends BaseService<IDOProject> {
  constructor(
    @InjectRepository(IDOProject)
    private repository: Repository<IDOProject>,
  ) {
    super(repository);
  }

  findByContract(contract: string): Promise<IDOProject> {
    return this.repository.findOne({ where: { contract } });
  }

  async findAll(): Promise<IDOProject[]> {
    const data = await this.repository.find();
    return data;
  }

  findById(id: number | string): Promise<IDOProject> {
    return this.repository.findOneById(id);
  }

  async update(id: number, attrs: Partial<IDOProject>): Promise<IDOProject> {
    const pro = await this.repository.findOne({ where: { id } });
    if (!pro) throw new NotFoundException('Project not found');
    return this.repository.save({ ...pro, ...attrs });
  }

  async create(data: CreateIDODto): Promise<IDOProject> {
    if (data.contract != 'TBA') {
      const pro = await this.findByContract(data.contract);
      if (pro) throw new BadRequestException('Contract is exist');
    }

    console.log('Data:', data);
    const project = this.repository.create({ ...data, createdAt: new Date() });
    return this.repository.save(project);
  }

  async remove(id: number) {
    const pro = await this.repository.findOne({ where: { id } });
    if (!pro) throw new NotFoundException('Project not found');
    return this.repository.delete(id);
  }

  async removeByContract(contract: string) {
    const pro = await this.findByContract(contract);
    if (!pro) throw new BadRequestException('Contract is exist');
    return this.repository.delete({ contract });
  }
}
