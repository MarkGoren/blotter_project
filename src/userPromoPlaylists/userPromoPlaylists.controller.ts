import { Controller, Get, Req } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserPromoPlaylistsService } from './userPromoPlaylists.service';

@Controller('userPromoPlaylists')
export class UserPromoPlaylistsController {
  constructor(
    private readonly userPromoPlaylistsService: UserPromoPlaylistsService,
    private readonly authService: AuthService,
  ) {}
  @Get('getAll')
  async getAllUserPromoPlaylists(@Req() req) {
    const userInfo = await this.authService.decodeToken(req);
    return this.userPromoPlaylistsService.getUserPromoPlaylists(
      userInfo.userId,
    );
  }
}
