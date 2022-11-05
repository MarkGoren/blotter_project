import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPromoPlaylists } from 'src/typeorm/enteties/userPromoPlaylists.entity';
import { UserPomoPlaylistsController } from './userPromoPlaylists.controller';
import { UserPromoPlaylistsService } from './userPromoPlaylists.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserPromoPlaylists])],
  providers: [UserPromoPlaylistsService],
  controllers: [UserPomoPlaylistsController],
  exports: [UserPromoPlaylistsService],
})
export class UserPromoPlaylistsModule {}
