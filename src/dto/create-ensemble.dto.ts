import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateEnsembleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  link: string;

  address: string;

 @IsInt()
  activeMusicians: number;

  practiceFrequency: string;

  genre: string;

  lookUpInfo: string;

  constructor(
    name: string,
    description: string,
    link: string,
    address: string,
    activeMusicians: number,
    practiceFrequency: string,
    genre: string,
    lookUpInfo: string,
  ) {
    this.name = name;
    this.description = description;
    this.link = link;
    this.address = address;
    this.activeMusicians = activeMusicians;
    this.practiceFrequency = practiceFrequency;
    this.genre = genre;
    this.lookUpInfo = lookUpInfo;
  }
}
