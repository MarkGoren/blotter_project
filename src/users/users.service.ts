import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/enteties/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  userLogin(userInfo) {
    return this.usersRepository
      .query(
        `select password_hash from users where email like '${userInfo.email}'`,
      )
      .then((data) => {
        if (data[0]) {
          if (bcrypt.compareSync(userInfo.password, data[0].password_hash)) {
            return this.usersRepository.query(
              `select * from users where email like '${userInfo.email}'`,
            );
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
  }

  userSubscribe(userInfo) {
    this.usersRepository.query(
      `UPDATE users SET is_sub = '1' WHERE id = '${userInfo.id}'`,
    );
  }
}
