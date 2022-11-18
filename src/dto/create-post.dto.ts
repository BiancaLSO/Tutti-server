import { Instrument } from 'src/schemas/instrument.schema';

export class CreatePostDto {
  title: string;
  description: string;
  instrument: string;
  genre: string;
  location: string;
}
