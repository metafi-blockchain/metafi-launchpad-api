import { IsEmail, IsEmpty, IsNotEmpty, IsObject, IsString,  } from "class-validator"


export class UpdateUserDto {

    @IsNotEmpty()
    name?: string;
    

}