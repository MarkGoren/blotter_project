import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  userRegister(
    @Body()
    userInfo,
    @Req() req,
    @Res() res,
  ) {
    this.usersService.userRegister(userInfo).then(() => {
      this.usersService.getUserInfoByEmail(userInfo.email).then((data) => {
        this.usersService.sendVerificationEmail(data[0]);
      });
    });
    res.status(200);
    res.end();
  }

  @Get('exists/:email')
  userExists(@Param('email') email: string) {
    return this.usersService.userExists(email);
  }

  @Post('login')
  async userLogin(
    @Body()
    loginInfo,
    @Req() req,
    @Res() res,
  ) {
    const userInfo = await this.usersService.userLogin(loginInfo);
    if (userInfo) {
      res.cookie('userInfo', userInfo[0]);
      res.end();
    } else {
      res.end();
    }
  }

  @Post('subscribe')
  async userSubscribe(
    @Body()
    userInfo,
    @Req() req,
    @Res() res,
  ) {
    this.usersService.userSubscribe(userInfo);
    res.cookie('isSub', true);
    res.end();
  }

  @Get('verifyEmail/:userId')
  async verifyEmail(@Param('userId') userId: number, @Res() res) {
    this.usersService.verifyEmail(userId);
    res.redirect(302, 'http://localhost:3001/');
    res.end();
  }
}
