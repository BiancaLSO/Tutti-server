import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, PassportModule,JwtModule.register({
    secret: jwtConstants.secret
  }),
],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
  
})
export class AuthModule {}
