import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { scrypt as _scrypt } from 'crypto';
import { UserDto } from 'src/modules/users/dtos/user.dto';
import { TOKENS } from 'src/utils/app.enums';
import { AuthSocialDto } from './dto/login.dto';
import { JwtConfigService } from './jwt.config.service';
import { comparePassword, hashPassword } from 'src/utils/helper';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) throw new BadRequestException('Email or password is incorrect!');

    const accessToken = await this.generateAccessToken(user);

    return {
      access_token: accessToken,
      // refresh_token : refreshToken
    };
  }
  async signup(email: string, password: string, name: string) {
    const users = await this.userService.findByEmail(email);

    if (users) throw new ConflictException('Email in use!');

    const pwdHash = await hashPassword(password);
    const user = await this.userService.signup({
      email,
      password: pwdHash,
      name: name,
    });

    const accessToken = await this.generateAccessToken(user);
    // const refreshToken = await this.generateRefreshToken(user);

    return {
      access_token: accessToken,
      // refresh_token : refreshToken
    };
  }

  async loginWithSocials(profile: AuthSocialDto) {}

  async signupWithSocials(profile: AuthSocialDto) {}
  async isValidUserBId(id: string) {
    return await this.userService.findById(id);
  }

  async verifyAsyncToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token, {
      algorithms: [TOKENS.ENCRYPT_ALGORITHMS],
      secret: this.jwtConfigService.createJwtOptions().secret,
    });
  }

  async isValidUserByEmail(email: string) {
    // return await this.userService.findAll({ email });
  }

  async isHasAddress(address: string, type: string) {}

  async generateAccessToken(user: UserDto) {
    const payload = { sub: user.id, version: user.version };
    return this.jwtService.sign(payload);
  }

  //validate user
  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserDto> {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;
    if (!user.password || !password) return null;
    const checkPwd = await comparePassword(user.password, password);

    if (!checkPwd) return null;
    return user;
  }
}
