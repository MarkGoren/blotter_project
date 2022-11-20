import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { info } from 'console';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get('getAll/:userId')
  getAll(@Param('userId') userId: number) {
    return this.favoritesService.getAll(userId);
  }

  @Get('getPlaylists/:userId')
  getPlaylists(@Param('userId') userId: number) {
    return this.favoritesService.getPlaylists(userId);
  }

  @Post('add')
  add(
    @Body()
    info,
    @Res() res,
  ) {
    this.favoritesService.add(info.userId, info.playlistId);
    res.end();
  }

  @Post('remove')
  remove(
    @Body()
    info,
    @Res() res,
  ) {
    this.favoritesService.remove(info.userId, info.playlistId);
    res.end();
  }
}
