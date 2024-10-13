import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { JwtAuthService } from './jwt.auth.service';
import { Request, Response } from 'express';
import {
  AuthSignatureDto,
  AuthDto,
  IVerifyEmail,
  SignupDto,
} from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async discordLogin() {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    const { user } = req;
    //@ts-ignore
    const { email, provider, displayName, avatar } = user;
    // Handle the user data as per your requirement
    const access_token = await this.jwtAuthService.loginWithSocials({
      email,
      provider,
      displayName,
      avatar,
    });
    const redirect_url = this.configService.get<string>('APP_REDIRECT_URL');
    res.status(200).redirect(`${redirect_url}/?access_token=${access_token}`);
  }

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    const access_token = await this.jwtAuthService.signup(
      body.email,
      body.password,
      body.name,
    );
    return { access_token };
  }

  @Post('login')
  async login(@Body() body: AuthDto) {
    const access_token = await this.jwtAuthService.login(
      body.email,
      body.password,
    );
    return { access_token };
  }
}
