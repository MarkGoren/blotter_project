import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserPromoPlaylists } from 'src/typeorm/enteties/userPromoPlaylists.entity';
import { UserPromoPlaylistsController } from './userPromoPlaylists.controller';
import { UserPromoPlaylistsService } from './userPromoPlaylists.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserPromoPlaylists]), AuthModule],
  providers: [UserPromoPlaylistsService],
  controllers: [UserPromoPlaylistsController],
  exports: [UserPromoPlaylistsService],
})
export class UserPromoPlaylistsModule {}
