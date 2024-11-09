import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import { Web3 } from 'web3';

export function IsValidAddress(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidAddress',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value == 'TBA') return true;
          return Web3.utils.checkAddressCheckSum(value);
        },
      },
    });
  };
}

export class CreateIDODto {
  @IsString()
  @IsNotEmpty()
  @IsValidAddress('contract', {
    message: 'Contract address not valid',
  })
  contract: string;
  @IsString()
  contractVersion: string = '1.0';
  @IsNumber()
  rate: number;
  @IsString()
  raiseTokenAddress: string;
  @IsNumber()
  raiseTokenDecimals: number;
  @IsString()
  raiseTokenSymbol: string;
  @IsString()
  releaseTokenAddress: string;
  @IsString()
  releaseTokenSymbol: string;
  @IsNumber()
  releaseTokenDecimals: number;
  @IsBoolean()
  isPrivate: boolean;
  @IsString()
  description: string;
  @IsString()
  telegram: string;
  @IsString()
  logo: string;
  @IsString()
  name: string;
  @IsNumber()
  totalSupply: number;
  @IsString()
  state: string = 'P';
  @IsString()
  medium: string;
  @IsString()
  twitter: string;
  @IsString()
  website: string;
  @IsString()
  youtube: string;
}
