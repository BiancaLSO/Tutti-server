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

  constructor(
    username: string,
    email: string,
    password: string,
    fullName: string,
    phoneNo: number,
    instrument: string,
    description: string,
    ensembles: Ensemble[],
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.phoneNo = phoneNo;
    this.instrument = instrument;
    this.description = description;
    this.ensembles = ensembles;
  }
}
