import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admins.service';
import { Request } from 'express';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly adminsService: AdminsService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async validateUser(userInfo) {
    let userInfoByEmail;

    if (userInfo.email.includes('blotteradmin')) {
      userInfoByEmail = await this.adminsService.findAdminByEmail(
        userInfo.email,
      );
      userInfoByEmail[0].isAdmin = true;
      userInfoByEmail[0].is_verified = true;
    } else {
      userInfoByEmail = await this.usersService.findUserByEmail(userInfo.email);
    }

    if (
      !userInfoByEmail[0] ||
      !userInfoByEmail[0].is_verified ||
      !bcrypt.compareSync(userInfo.password, userInfoByEmail[0].password_hash)
    ) {
      return false;
    }

    const { password_hash, ...result } = userInfoByEmail[0];

    return result;
  }

  async createToken(userInfo) {
    const payload = { email: userInfo.email, sub: userInfo.id, isAdmin: false };
    userInfo?.isAdmin === true ? (payload.isAdmin = true) : null;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async decodeToken(req: Request) {
    const access_token = req.cookies.jwtToken.access_token;
    const payload = this.jwtService.decode(access_token);
    const result = this.jwtStrategy.validate(payload);
    return result;
  }
}
