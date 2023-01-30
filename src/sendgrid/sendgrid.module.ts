import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SendgridController } from './sendgrid.controller';
import { SendgridService } from './sendgrid.service';

@Module({
  providers: [SendgridService],
  controllers: [SendgridController],
  exports: [SendgridService],
  imports: [UsersModule],
})
export class SendgridModule {}
