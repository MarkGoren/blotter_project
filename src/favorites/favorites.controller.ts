import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly authSevice: AuthService,
  ) {}
  @Get('getAll')
  async getAll(@Req() req) {
    const userInfo = await this.authSevice.decodeToken(req);
    const favorites = await this.favoritesService.getAll(userInfo.userId);
    return favorites;
  }

  @Get('getPlaylists')
  async getPlaylists(@Req() req) {
    const userInfo = await this.authSevice.decodeToken(req);
    const playlists = await this.favoritesService.getPlaylists(userInfo.userId);
    return playlists;
  }

  @Post('add')
  async add(
    @Body()
    info,
    @Req() req,
    @Res() res,
  ) {
    const userInfo = await this.authSevice.decodeToken(req);
    this.favoritesService.add(userInfo.userId, info.playlistId);
    res.end();
  }

  @Post('remove')
  async remove(
    @Body()
    info,
    @Req() req,
    @Res() res,
  ) {
    const userInfo = await this.authSevice.decodeToken(req);
    this.favoritesService.remove(userInfo.userId, info.playlistId);
    res.end();
  }
}
