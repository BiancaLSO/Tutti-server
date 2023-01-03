import { IsInt, IsNotEmpty } from 'class-validator';

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

  constructor(
    name: string,
    description: string,
    link: string,
    address: string,
    activeMusicians: number,
    practiceFrequency: string,
    genre: string,
  ) {
    this.name = name;
    this.description = description;
    this.link = link;
    this.address = address;
    this.activeMusicians = activeMusicians;
    this.practiceFrequency = practiceFrequency;
    this.genre = genre;

  }
}
