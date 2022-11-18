import { IsNotEmpty } from 'class-validator';
import { Ensemble } from 'src/schemas/ensemble.schema';
import { PostCard } from 'src/schemas/post-card.schema';

export class CreateMusicianDto {
  @IsNotEmpty()
  fullName: string;

  phoneNo: number;

  instrument: string;

  description: string;

  ensembles: Ensemble[];

  posts: PostCard[];
}
