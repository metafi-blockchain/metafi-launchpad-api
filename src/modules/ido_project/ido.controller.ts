import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { IdoService } from './ido.service';
import { AdminGuard } from 'src/guards/admin.auth.guard';
import { CreateIDODto } from './dto/ido.dto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('projects')
export class IdoController {
  constructor(private projectService: IdoService) {}

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() createDto: CreateIDODto) {
    console.log('createDto:', createDto);
    return this.projectService.create(createDto);
  }
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Param('id') id: number, @Body() body) {
    return this.projectService.update(id, body);
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:contract')
  async deleteByContract(@Param('contract') contract: string) {
    return this.projectService.removeByContract(contract);
  }

  @Get('detail/:contract')
  async getDetail(@Param('contract') contract: string) {
    return this.projectService.findByContract(contract);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Get('/')
  async getAllProject() {
    console.log('getAllProject');

    return this.projectService.findAll();
  }
}
