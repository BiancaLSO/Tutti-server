import { Instrument } from 'src/utils/instruments';

export class CreatePostDto {
  title: string;
  description: string;
  instrument: Instrument;
  genre: string;
  location: string;
}
