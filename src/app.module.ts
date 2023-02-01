import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserPromoPlaylistsModule } from './userPromoPlaylists/userPromoPlaylists.module';
import { PromoRequestsModule } from './promoRequests/promoRequests.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AdminsModule } from './admins/admins.module';
import { ConfigModule } from '@nestjs/config';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    UserPromoPlaylistsModule,
    PromoRequestsModule,
    PlaylistsModule,
    FavoritesModule,
    AdminsModule,
    SendgridModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: '	apikey',
          pass: process.env.SEND_GRID_KEY,
        },
      },
      template: {
        dir: join(__dirname, 'mails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'blotter_data_demo',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
