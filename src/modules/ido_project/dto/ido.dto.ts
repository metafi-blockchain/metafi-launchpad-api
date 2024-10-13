import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIDODto {
  @IsString()
  @IsNotEmpty()
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
