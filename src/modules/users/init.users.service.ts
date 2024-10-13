import { Injectable } from '@nestjs/common';
import { Users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from '../authentication/dto/login.dto';

@Injectable()
export class InitUsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  init(data: SignupDto): Promise<Users> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }
}
