import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tutti-user:tutti1234@tutti.5qivxnv.mongodb.net/tutti',
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
