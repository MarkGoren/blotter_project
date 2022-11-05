import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromoRequests } from 'src/typeorm/enteties/promoRequests.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromoRequestsService {
  constructor(
    @InjectRepository(PromoRequests)
    private promoRequestsRepository: Repository<PromoRequests>,
  ) {}
}
