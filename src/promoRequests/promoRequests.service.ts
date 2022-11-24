import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { PromoRequests } from 'src/typeorm/enteties/promoRequests.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromoRequestsService {
  constructor(
    @InjectRepository(PromoRequests)
    private promoRequestsRepository: Repository<PromoRequests>,
  ) {}

  newReq(reqInfo) {
    const dateNow = moment().format('YYYY-MM-DD');
    this.promoRequestsRepository.query(
      `insert into promo_requests (user_id, request_date, genre, song_src) values (${reqInfo.userId}, '${dateNow}', '${reqInfo.genre}', '${reqInfo.songLink}')`,
    );
  }

  getLastReqDate(userId) {
    return this.promoRequestsRepository.query(
      `select request_date from promo_requests where user_id = ${userId}`,
    );
  }
}
