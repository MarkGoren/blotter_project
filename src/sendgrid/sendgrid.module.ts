import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { SendgridController } from './sendgrid.controller';
import { SendgridService } from './sendgrid.service';

@Module({
  providers: [SendgridService],
  controllers: [SendgridController],
  exports: [SendgridService],
  imports: [UsersModule, AuthModule],
})
export class SendgridModule {}
