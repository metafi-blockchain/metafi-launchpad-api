import { Injectable, UnauthorizedException, Request , ExecutionContext} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as fs from 'fs';
import { JwtAuthService } from '../modules/authentication/jwt.auth.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ActivitylogsService } from 'src/modules/activitylogs/activitylogs.service';
import { UsersService } from 'src/modules/users/users.service';

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(
    private readonly jwtConfigService: ConfigService, 
    private readonly userService: UsersService, private logService: ActivitylogsService) {
    super();
  }

  async canActivate(context: ExecutionContext) {

    console.log("JwtAuthGuard running");

    const PathFile = this.jwtConfigService.get('JTW_PUBLIC_PATH_FILE');
    const publicKey = fs.readFileSync(PathFile, 'utf-8')

    const req = context.switchToHttp().getRequest();
    // console.log(req.headers)
    const authHeader = req.headers.authorization;

    // console.log(`authHeader`, authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }
    const token = authHeader.split(' ')[1];

    if(!token) throw new UnauthorizedException();

    try {
      const decoded = jwt.verify(token, publicKey)
      const id = <string> decoded.sub
      //@ts-ignore
      const version = <number>decoded.version
      //product can get it from redis
      const user = await this.userService.findById(Number(id));
      
      
      req.user = user;
      if(user.version !== version){
         throw new UnauthorizedException("User logout!");
      }
      // console.log(uuid)
      this.writeLogAction(req)
      return req;
    } catch (err) {
      throw new UnauthorizedException("Token expired!");
    }
  }

  private writeLogAction = async (req: Request) => {
    let requestMethod = req.method
    if (requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'DELETE' || requestMethod === 'PATCH') {
       this.logService.create({
         methods: requestMethod,
         account: <string>req["user"].id,
         ipAddress: req["ip"],
         path: req["path"] || req.url,
         data: req.body ? JSON.stringify(req.body) : "",
       })
    }
  }
}
