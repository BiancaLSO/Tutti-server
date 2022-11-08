import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EnsembleModule } from './modules/ensemble.module';
import { GenreModule } from './modules/genre.module';
import { InstrumentModule } from './modules/instrument.module';
import { MusicianModule } from './modules/musician.module';
import { PostCardModule } from './modules/post-card.module';
import { PracticeFrequencyModule } from './modules/practice-frequency.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tutti-user:tutti1234@tutti.5qivxnv.mongodb.net/tutti',
    ),
    UserModule,
    InstrumentModule,
    MusicianModule,
    GenreModule,
    PracticeFrequencyModule,
    EnsembleModule,
    PostCardModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
