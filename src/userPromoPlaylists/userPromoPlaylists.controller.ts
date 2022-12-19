import { Controller, Get, Param } from '@nestjs/common';
import { UserPromoPlaylistsService } from './userPromoPlaylists.service';

@Controller('userPromoPlaylists')
export class UserPromoPlaylistsController {
  constructor(
    private readonly userPromoPlaylistsService: UserPromoPlaylistsService,
  ) {}
  @Get('getAll/:userId')
  getAllUserPromoPlaylists(@Param('userId') userId: number) {
    return this.userPromoPlaylistsService.getUserPromoPlaylists(userId);
  }
}
