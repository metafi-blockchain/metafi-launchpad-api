import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IUser } from 'src/interface/user.interface';

export class UserDto implements IUser {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  version?: number;

  @Expose()
  role: string;
}

export class ChangePwdDto {
  new_password: string;
  old_password: string;
  confirm_new_password: string;
}
