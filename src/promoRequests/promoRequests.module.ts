import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PromoRequests } from 'src/typeorm/enteties/promoRequests.entity';
import { PromoRequestsController } from './promoRequests.controller';
import { PromoRequestsService } from './promoRequests.service';

@Module({
  imports: [TypeOrmModule.forFeature([PromoRequests]), AuthModule],
  providers: [PromoRequestsService],
  controllers: [PromoRequestsController],
  exports: [PromoRequestsService],
})
export class PromoRequestsModule {}
