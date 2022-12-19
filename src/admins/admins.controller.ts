import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('login')
  async userLogin(
    @Body()
    loginInfo,
    @Req() req,
    @Res() res,
  ) {
    const userInfo = await this.adminsService.userLogin(loginInfo);
    if (userInfo) {
      userInfo[0].isAdmin = true;
      res.cookie('userInfo', userInfo[0]);
      res.end();
    } else {
      res.end();
    }
  }
}
