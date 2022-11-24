import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { PromoRequestsService } from './promoRequests.service';

@Controller('promoRequests')
export class PromoRequestsController {
  constructor(private readonly promoRequestsService: PromoRequestsService) {}

  @Post('newReq')
  newReq(
    @Body()
    reqInfo,
    @Res() res,
  ) {
    this.promoRequestsService.newReq(reqInfo);
    res.end();
  }

  @Get('lastReqDate/:userId')
  getLastReqDate(@Param('userId') userId: number) {
    return this.promoRequestsService.getLastReqDate(userId);
  }
}
