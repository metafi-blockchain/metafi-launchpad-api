import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  BadRequestException,
  ConflictException,
  Req,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { AdminGuard } from 'src/guards/admin.auth.guard';
import { OtpService } from './opt.service';
import { randomBytes } from 'crypto';
import { ChangePwdDto, UserDto } from './dtos/user.dto';

import { ConfigService } from '@nestjs/config';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      body?: any;
    }
  }
}

// @UseInterceptors(CurrentUserInterceptor)   //config one class
// @UseGuards( RolesGuard)
@UseGuards(JwtAuthGuard)
@Serialize(UserDto)
@Controller('user')
export class UsersController {
  constructor(
    private userService: UsersService,
    private otpService: OtpService,
    private readonly configService: ConfigService,
  ) {}

  // @UseInterceptors(CurrentUserInterceptor) //config one route
  @Serialize(UserDto)
  @UseGuards(AdminGuard)
  @Get('/whoami')
  async whoAmI(@Request() request: any) {
    // console.log("whoami");

    return request.user;
  }

  @Serialize(UserDto) //use default interceptor
  @Get('/me')
  async findUserBuyId(@Req() req) {
    return req.user;
  }

  @Put('')
  async updateUser(@Request() request: any) {}

  @Put('/verify')
  async verifyUser(@Body('opt') opt: string, @Req() req) {
    const { user } = req;

    return false;
  }

  /**
   * function use one opt token
   * @param req
   * @returns
   */
  @Put('/request-verify')
  async sendVerifyUser(@Req() req) {
    const { user } = req;

    if (user.verify) {
      throw new ConflictException('User verified!');
    }

    try {
      //solution

      const secret = randomBytes(16).toString('hex');
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Can not send to your email! Please try again!',
      );
    }
  }

  /**
   * function use one opt token
   * @param req
   * @returns
   */
  @Get('/request-verify')
  async sendVerifyEmail(@Req() req) {
    const { user } = req;

    if (user.verify) {
      throw new ConflictException('User verified!');
    }

    // return false
  }

  @Get('/profile/:id')
  async getUserProfile(@Param('id') id: string) {}
}
