import { IsNotEmpty } from 'class-validator';

export class CreateEnsembleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  link: string;

  address: string;

  activeMusicians: number;

  practiceFrequency: string;

  genre: string;
}
