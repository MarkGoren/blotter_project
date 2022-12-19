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
    this.promoRequestsRepository
      .query(
        `insert into promo_requests (user_id, request_date, genre, song_src) values (${reqInfo.userId}, '${dateNow}', '${reqInfo.genre}', '${reqInfo.songLink}')`,
      )
      .then(() =>
        this.promoRequestsRepository.query(
          `UPDATE users SET last_submit = '${dateNow}' WHERE id = ${reqInfo.userId}`,
        ),
      );
  }

  getLastReqDate(userId) {
    return this.promoRequestsRepository.query(
      `select last_submit from users where id = ${userId}`,
    );
  }

  getAll() {
    return this.promoRequestsRepository.query(`select * from promo_requests`);
  }

  processRequest(info) {
    if (info.approval) {
      const dateNow = moment().format('YYYY-MM-DD');
      return this.promoRequestsRepository
        .query(`DELETE from promo_requests WHERE id = ${info.request_id}`)
        .then(() =>
          this.promoRequestsRepository.query(
            `INSERT INTO user_promo_playlists (user_id, playlist_id, is_approved, song_src) VALUES ('${info.user_id}', '${info.playlist_id}', 1, '${info.song_uri}')`,
          ),
        )
        .then(() =>
          this.promoRequestsRepository.query(
            `UPDATE playlists SET add_date = '${dateNow}' WHERE src LIKE '%${info.playlist_id}%'`,
          ),
        );
    } else {
      return this.promoRequestsRepository
        .query(`DELETE from promo_requests WHERE id = ${info.request_id}`)
        .then(() =>
          this.promoRequestsRepository.query(
            `INSERT INTO user_promo_playlists (user_id, is_approved, song_src) VALUES ('${info.user_id}', 0, '${info.song_uri}')`,
          ),
        );
    }
  }
}
