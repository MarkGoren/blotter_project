import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlists } from 'src/typeorm/enteties/playlists.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlists)
    private playlistsRepository: Repository<Playlists>,
  ) {}

  getPlaylists() {
    return this.playlistsRepository.query('SELECT * FROM playlists;');
  }

  getByCategory(category) {
    return this.playlistsRepository.query(
      `SELECT * FROM playlists where genre like '${category}' order by name asc;`,
    );
  }

  getNewPlaylists() {
    const dateNow = moment().format('YYYY-MM-DD');
    const dateWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
    return this.playlistsRepository.query(
      `SELECT * FROM playlists where add_date BETWEEN '${dateWeekAgo}' AND '${dateNow} order by add_date asc'`,
    );
  }
}
