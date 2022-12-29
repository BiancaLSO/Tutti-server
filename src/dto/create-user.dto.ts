import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import { Ensemble } from 'src/schemas/ensemble.schema';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullName: string;
  
  phoneNo: number;

  instrument: string;

  description: string;

  ensembles: Ensemble[];
}
