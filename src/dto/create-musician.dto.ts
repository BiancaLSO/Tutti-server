import { IsNotEmpty } from 'class-validator';

export class CreateMusicianDto {
  @IsNotEmpty()
  fullName: string;

  phoneNo: number;

  instrument: string;

  description: string;

  ensembles: [];

  posts: [];
}
