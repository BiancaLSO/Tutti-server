import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { EnsembleModule } from './modules/ensemble.module';
import { UserModule } from './modules/user.module';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tutti-user:tutti1234@tutti.5qivxnv.mongodb.net/tutti-test',
    ),
    EnsembleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class TestModule {}
