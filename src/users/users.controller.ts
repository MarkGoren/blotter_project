import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/local.strategy';
import { CryptoService } from 'src/crypto/crypto.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly localStrategy: LocalStrategy,
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
  ) {}
  @Post('register')
  async userRegister(
    @Body()
    userInfo,
    @Req() req,
    @Res() res,
  ) {
    const data = await this.usersService.userRegister(userInfo).then(() => {
      this.usersService.findUserByEmail(userInfo.email);
    });

    this.usersService.sendVerificationEmail(data[0]).then(() => {
      res.status(200);
    });
    res.end();
  }

  @Get('exists/:email')
  userExists(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Post('login')
  async userLogin(
    @Body()
    loginInfo,
    @Request() req,
    @Res() res,
  ) {
    const userInfo = await this.localStrategy.validate(loginInfo);

    if (userInfo) {
      const jwtToken = await this.authService.createToken(userInfo);
      const { id, email, ...userInfoForCookie } = userInfo;
      res.cookie('userInfo', userInfoForCookie);
      res.cookie('jwtToken', jwtToken);
      res.end();
    }

    res.end();
  }

  @Put('subscribe')
  async userSubscribe(@Req() req, @Res() res) {
    const userInfo = this.authService.decodeToken(req);
    this.usersService.userSubscribe(userInfo).then(() => {
      res.cookie('isSub', true);
      res.end();
    });
  }

  //link to route is accessed through email that is sent by register user route
  @Get('verifyEmail/:encryptedUserId')
  async verifyEmail(
    @Param('encryptedUserId') encryptedUserId: string,
    @Res() res,
  ) {
    this.usersService.verifyEmail(encryptedUserId).then(() => {
      res.redirect(302, 'http://localhost:3001/');
      res.end();
    });
  }

  //this route is provided by the sendResetPasswordEmail via sent email
  @Get('forgotPassword/:encryptedUserId')
  async openChangePasswordPage(
    @Param('encryptedUserId') encryptedUserId: number,
    @Res() res,
  ) {
    res.cookie('encryptedUserId', encryptedUserId);
    res.redirect(302, 'http://localhost:3001/changePassword');
    res.end();
  }

  //first step of password reset
  @Post('sendResetPasswordEmail')
  async sendResetPasswordEmail(@Body() data, @Res() res) {
    this.usersService
      .findUserByEmail(data.email)
      .then((data) => this.usersService.sendResetPasswordEmail(data[0]));
    res.end();
  }

  @Post('changePassword')
  async changePassword(@Body() data, @Req() req, @Res() res) {
    const encryptedUserId = req.cookies.encryptedUserId;
    this.usersService.changePassword(encryptedUserId, data.password);
    res.end();
  }
}
