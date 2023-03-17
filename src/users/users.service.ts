import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/enteties/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly cryptoService: CryptoService,
  ) {
    const configService = new ConfigService();
    SendGrid.setApiKey(configService.get<string>('SEND_GRID_KEY'));
  }

  async findUserByEmail(email) {
    return this.usersRepository.query(
      `select * from users where email like '${email}'`,
    );
  }

  async userRegister(userInfo) {
    const username = userInfo.email.split('@')[0];
    const hashed = bcrypt.hashSync(userInfo.password, 10);
    return this.usersRepository.query(
      `insert into users (username, email, password_hash, is_sub) values ('${username}', '${userInfo.email}', '${hashed}', false)`,
    );
  }

  async sendVerificationEmail(userInfo) {
    const configService = new ConfigService();
    const encryptedUserId = await this.cryptoService.encryptUserId(userInfo.id);
    const mail = {
      from: 'gormark2001@gmail.com',
      to: userInfo.email,
      cc: '',
      templateId: configService.get<string>('EMAIL_VERIFICATION_TEMPLATE_ID'),
      dynamicTemplateData: {
        link: `http://localhost:3000/users/verifyEmail/${encryptedUserId}`,
      },
    };
    return SendGrid.send(mail);
  }

  async sendResetPasswordEmail(userInfo) {
    const configService = new ConfigService();
    const encryptedUserId = await this.cryptoService.encryptUserId(userInfo.id);
    const mail = {
      from: 'gormark2001@gmail.com',
      to: userInfo.email,
      cc: '',
      templateId: configService.get<string>('EMAIL_RESET_PASSWORD_TEMPLATE_ID'),
      dynamicTemplateData: {
        link: `http://localhost:3000/users/forgotPassword/${encryptedUserId}`,
      },
    };
    return SendGrid.send(mail);
  }

  async changePassword(encryptedUserId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const decryptedUserId = await this.cryptoService.decryptUserId(
      encryptedUserId,
    );
    return this.usersRepository.query(
      `UPDATE users SET password_hash = '${hashedPassword}' WHERE id = '${decryptedUserId}'`,
    );
  }

  userSubscribe(userInfo) {
    return this.usersRepository.query(
      `UPDATE users SET is_sub = '1' WHERE id = '${userInfo.id}'`,
    );
  }

  getSubscribedEmails() {
    return this.usersRepository.query(
      `SELECT email FROM users WHERE is_sub = '1'`,
    );
  }

  async verifyEmail(encryptedUserId: string) {
    const decryptedUserId = await this.cryptoService.decryptUserId(
      encryptedUserId,
    );
    return this.usersRepository.query(
      `UPDATE users SET is_verified = '1' WHERE id = '${decryptedUserId}'`,
    );
  }
}
