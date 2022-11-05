import { Controller, Get } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get('getAll')
  getPlaylists() {
    return this.playlistsService.getPlaylists();
  }
}
