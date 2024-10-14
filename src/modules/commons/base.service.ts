import { BadRequestException, NotFoundException } from '@nestjs/common';

import { IBaseService } from 'src/interface/base.service.interface';
import { Repository } from 'typeorm';

export abstract class BaseService<T> implements IBaseService<T> {
  protected constructor(public readonly _repository: Repository<T>) {}

  getModel(): Repository<T> {
    try {
      return this._repository;
    } catch (error) {
      throw error;
    }
  }

  async create(data: any): Promise<T> {
    try {
      data.createdAt = new Date();
      // console.log(data)
      return this._repository.save(data);
    } catch (error) {
      throw new BadRequestException(
        'Has an error occurred. Please contact admin!',
      );
    }
  }

  async update(cond: any, body: any): Promise<any> {
    body.updatedAt = new Date();
    return this._repository.update(cond, body);
  }

  async delete(cond: any): Promise<any> {
    return await this._repository.delete(cond);
  }

  async findOne(cond: any): Promise<T> {
    try {
      return this._repository.findOne(cond);
    } catch (error) {
      throw new BadRequestException(
        'Has an error occurred. Please contact admin!',
      );
    }
  }
  async findAll(cond: any): Promise<Array<T>> {
    try {
      return await this._repository.find(cond);
    } catch (error) {
      throw new BadRequestException(
        'Has an error occurred. Please contact admin!',
      );
    }
  }
}
