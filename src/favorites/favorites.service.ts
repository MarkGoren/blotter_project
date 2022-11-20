import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorites } from 'src/typeorm/enteties/favorites.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
  ) {}

  getAll(userId) {
    return this.favoritesRepository
      .query(`SELECT playlist_id FROM favorites where user_id = ${userId};`)
      .then((data) => data.map((obj) => obj.playlist_id));
  }

  getPlaylists(userId) {
    return this.favoritesRepository.query(
      `SELECT * FROM playlists where id in (SELECT playlist_id FROM blotter_data_demo.favorites where user_id = ${userId});`,
    );
  }

  remove(userId, playlistId) {
    this.favoritesRepository.query(
      `delete from favorites where user_id = ${userId} and playlist_id = ${playlistId}`,
    );
  }

  add(userId, playlistId) {
    this.favoritesRepository.query(
      `insert into favorites (user_id, playlist_id) values (${userId}, ${playlistId})`,
    );
  }
}
