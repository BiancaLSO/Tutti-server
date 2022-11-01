import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Musician, MusicianSchema } from 'src/schemas/musician.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Musician.name, schema: MusicianSchema }])],
  controllers: [],
  providers: [],
})
export class MusicianModule {}