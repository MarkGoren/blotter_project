import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/enteties/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { response, Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  userExists(email) {
    return this.usersRepository.query(
      `select * from users where email like '${email}'`,
    );
  }

  userRegister(userInfo) {
    const username = userInfo.email.split('@')[0];
    const hashed = bcrypt.hashSync(userInfo.password, 10);
    this.usersRepository.query(
      `insert into users (username, email, password_hash, is_sub) values ('${username}', '${userInfo.email}', '${hashed}', false)`,
    );
  }
}
