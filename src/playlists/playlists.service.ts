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

  getAllGenres() {
    return this.playlistsRepository
      .query(`SELECT DISTINCT genre FROM playlists`)
      .then((data) => data.map((obj) => obj.genre));
  }

  deletePlaylistById(playlistId) {
    return this.playlistsRepository.query(
      `DELETE FROM playlists WHERE id = '${playlistId}'`,
    );
  }

  addPlaylist(info) {
    const dateNow = moment().format('YYYY-MM-DD');
    const playlistSrc = `https://open.spotify.com/embed/playlist/${
      info.playlistSrc.split('/')[4].split('?')[0]
    }?utm_source=generator`;
    return this.playlistsRepository.query(
      `INSERT INTO playlists (src, add_date, name, genre) VALUES ('${playlistSrc}', '${dateNow}', '${info.playlistName}', '${info.genre}')`,
    );
  }
}
