import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoRequests } from 'src/typeorm/enteties/promoRequests.entity';
import { PromoRequestsController } from './promoRequests.controller';
import { PromoRequestsService } from './promoRequests.service';

@Module({
  imports: [TypeOrmModule.forFeature([PromoRequests])],
  providers: [PromoRequestsService],
  controllers: [PromoRequestsController],
  exports: [PromoRequestsService],
})
export class PromoRequestsModule {}
