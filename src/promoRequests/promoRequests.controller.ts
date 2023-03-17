import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { PromoRequestsService } from './promoRequests.service';

@Controller('promoRequests')
export class PromoRequestsController {
  constructor(
    private readonly promoRequestsService: PromoRequestsService,
    private readonly authService: AuthService,
  ) {}

  @Post('newReq')
  async newReq(
    @Body()
    reqInfo,
    @Req() req,
    @Res() res,
  ) {
    const userInfo = await this.authService.decodeToken(req);
    reqInfo.userId = userInfo.userId;
    this.promoRequestsService.newReq(reqInfo);
    res.end();
  }

  @Get('lastReqDate')
  @UseGuards(AdminGuard)
  async getLastReqDate(@Req() req) {
    const userInfo = await this.authService.decodeToken(req);
    return this.promoRequestsService.getLastReqDate(userInfo.userId);
  }

  @Get('getAll')
  @UseGuards(AdminGuard)
  getAll() {
    return this.promoRequestsService.getAll();
  }

  @Post('processRequest')
  @UseGuards(AdminGuard)
  processRequest(
    @Body()
    info,
    @Res() res,
  ) {
    this.promoRequestsService.processRequest(info);
    res.end();
  }
}
