import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '.././utils/bcrypt';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      const matched = comparePasswords(password, user.password);
      if (matched) {
        return user;
      } else {
        console.log("Password don't match");
        return null;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, _id: user._id };
    return {
      id: payload._id,
      access_token: this.jwtService.sign(payload),
    };
  }

  // async getProfile(user: any) {
  //   // const userFromDb = await this.userService.findByUsername(user.username);
  //   const payload = { username: user.username, _id: user._id };
  //   return {
  //     username: payload.username,
  //     _id: payload._id,
  //   };
  // }
}
