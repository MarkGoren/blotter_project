import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsService } from 'src/admins/admins.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';
import { CryptoService } from 'src/crypto/crypto.service';
import { Admins } from 'src/typeorm/enteties/admins.entity';
import { Users } from 'src/typeorm/enteties/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Admins])],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtService,
    AdminsService,
    JwtStrategy,
    CryptoService,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
