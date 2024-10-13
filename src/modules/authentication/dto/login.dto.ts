

import {IsEmail, IsNotEmpty, IsString} from 'class-validator'
export class AuthSocialDto {
    @IsEmail()
    email: string;

    provider?: string

    avatar?: string

    displayName?: string

}

export class AuthDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class AuthSignatureDto {

    @IsNotEmpty()
    dataSigned: Array<any>;
    @IsNotEmpty()
    message: string;
    @IsNotEmpty()
    address: string;
}

export interface IMessageSinged {
	messageBytes: string, 
	signature: string
}

export interface IVerifyEmail {
	opt: string
}

export class SignupDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;
}