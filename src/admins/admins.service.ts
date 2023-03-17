import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admins } from 'src/typeorm/enteties/admins.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admins) private adminsRepository: Repository<Admins>,
  ) {}

  async findAdminByEmail(email) {
    return this.adminsRepository.query(
      `select * from admins where email like '${email}'`,
    );
  }
}
