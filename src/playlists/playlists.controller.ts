import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
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

  @Get('getAllGenres')
  getAllGeneres() {
    return this.playlistsService.getAllGenres();
  }

  @Post('addPlaylist')
  @UseGuards(AdminGuard)
  addPlaylist(@Body() info, @Res() res) {
    this.playlistsService.addPlaylist(info).then(() => {
      return res.status(200).json('playlist added');
    });
  }

  @Delete('deletePlaylist/:id')
  @UseGuards(AdminGuard)
  deletePlaylistById(@Param('id') id: number, @Res() res) {
    this.playlistsService.deletePlaylistById(id).then(() => {
      return res.status(200).json('playlist deleted');
    });
  }
}
