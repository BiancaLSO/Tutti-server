import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user) {
     const matched = comparePasswords(password, user.password) 
        if(matched ){
            return user;
        } else{
            console.log("Password don't match")
            return null
        }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
    
}

async getProfile(user: any){
    return{
        username: user.username, sub: user.userId
    }
}
}