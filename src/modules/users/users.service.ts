import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { STEP_UP_POINT, TOKENS } from 'src/utils/app.enums';
import { BaseService } from '../commons/base.service';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from '../authentication/dto/login.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  signup(data: SignupDto): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number | string): Promise<User> {
    return this.usersRepository.findOneById(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  login(email: string, password: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email, password } });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    // Object.assign(user, attrs);
    return this.usersRepository.save({ ...user, ...attrs });
  }

  async findByCondition(attrs: Partial<User>): Promise<User[]> {
    return this.usersRepository.find({ where: attrs });
  }
  async create(data: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }
}