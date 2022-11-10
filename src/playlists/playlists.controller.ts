import { Controller, Get, Param } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get('getAll')
  getPlaylists() {
    return this.playlistsService.getPlaylists();
  }

  @Get('category/:category')
  getByCategory(@Param('category') category: string) {
    return this.playlistsService.getByCategory(category);
  }

  @Get('whatsNew')
  getNewPlaylists() {
    return this.playlistsService.getNewPlaylists();
  }
}
