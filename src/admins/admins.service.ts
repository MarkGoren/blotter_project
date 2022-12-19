import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admins } from 'src/typeorm/enteties/admins.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admins) private adminsRepository: Repository<Admins>,
  ) {}

  userLogin(userInfo) {
    return this.adminsRepository
      .query(
        `select password_hash from admins where email like '${userInfo.email}'`,
      )
      .then((data) => {
        if (data[0]) {
          if (bcrypt.compareSync(userInfo.password, data[0].password_hash)) {
            return this.adminsRepository.query(
              `select * from admins where email like '${userInfo.email}'`,
            );
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
  }
}
