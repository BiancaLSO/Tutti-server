import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicianController } from 'src/controllers/musician.controller';
import { Musician, MusicianSchema } from 'src/schemas/musician.schema';
import { MusicianService } from 'src/services/musician.service';
import { CreateMusicianController } from 'src/controllers/create-musician.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Musician.name, schema: MusicianSchema },
    ]),
  ],
  controllers: [MusicianController, CreateMusicianController],
  providers: [MusicianService],
})
export class MusicianModule {}
