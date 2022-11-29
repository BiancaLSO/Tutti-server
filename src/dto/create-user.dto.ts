import { IsEmail, IsNotEmpty } from 'class-validator';
import { Ensemble } from 'src/schemas/ensemble.schema';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: number;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullName: string;

  phoneNo: number;

  instrument: string;

  description: string;

  ensembles: Ensemble[];
}
