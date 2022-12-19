import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPromoPlaylists } from 'src/typeorm/enteties/userPromoPlaylists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserPromoPlaylistsService {
  constructor(
    @InjectRepository(UserPromoPlaylists)
    private userPromoPlaylistsRepository: Repository<UserPromoPlaylists>,
  ) {}

  getUserPromoPlaylists(userId) {
    return this.userPromoPlaylistsRepository.query(
      `SELECT * FROM user_promo_playlists WHERE user_id = ${userId}`,
    );
  }
}
