import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EnsembleModule } from './modules/ensemble.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      // 'mongodb+srv://tutti-user:tutti1234@tutti.5qivxnv.mongodb.net/tutti',
      process.env.DATABASE_URL ||
        'mongodb+srv://tutti-user:tutti1234@tutti.5qivxnv.mongodb.net/tutti',
    ),
    UserModule,
    EnsembleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
