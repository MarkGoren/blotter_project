import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
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
    this.usersService.userRegister(userInfo);
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
}
