import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenreModule } from './modules/genre.module';
import { InstrumentModule } from './modules/instrument.module';
import { MusicianModule } from './modules/musician.module';
import { UserModule } from './modules/user.module';
import { PracticeFrequency } from './schemas/practice-frequency.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tutti-user:tutti1234@tutti.5qivxnv.mongodb.net/tutti',
    ),
    UserModule,
    InstrumentModule,
    MusicianModule,
    GenreModule,
    PracticeFrequency,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
