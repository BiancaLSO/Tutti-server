import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicianController } from '.././controllers/musician.controller';
import { Musician, MusicianSchema } from 'src/schemas/musician.schema';
import { MusicianService } from '.././services/musician.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Musician.name, schema: MusicianSchema },
    ]),
  ],
  controllers: [MusicianController],
  providers: [MusicianService],
})
export class MusicianModule {}
