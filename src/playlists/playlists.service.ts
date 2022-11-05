import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlists } from 'src/typeorm/enteties/playlists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlists)
    private playlistsRepository: Repository<Playlists>,
  ) {}
}
