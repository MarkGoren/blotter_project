import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/enteties/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    const configService = new ConfigService();
    SendGrid.setApiKey(configService.get<string>('SEND_GRID_KEY'));
  }

  userExists(email) {
    return this.usersRepository.query(
      `select * from users where email like '${email}'`,
    );
  }

  userRegister(userInfo) {
    const username = userInfo.email.split('@')[0];
    const hashed = bcrypt.hashSync(userInfo.password, 10);
    return this.usersRepository.query(
      `insert into users (username, email, password_hash, is_sub) values ('${username}', '${userInfo.email}', '${hashed}', false)`,
    );
  }

  getUserInfoByEmail(userEmail) {
    return this.usersRepository.query(
      `SELECT email, id FROM users WHERE email like '${userEmail}'`,
    );
  }

  sendVerificationEmail(userInfo) {
    const configService = new ConfigService();
    const mail = {
      from: 'gormark2001@gmail.com',
      to: userInfo.email,
      cc: '',
      templateId: configService.get<string>('EMAIL_VERIFICATION_TEMPLATE_ID'),
      dynamicTemplateData: {
        link: `http://localhost:3000/users/verifyEmail/${userInfo.id}`,
      },
    };
    return SendGrid.send(mail);
  }

  sendResetPasswordEmail(userInfo) {
    const configService = new ConfigService();
    const mail = {
      from: 'gormark2001@gmail.com',
      to: userInfo.email,
      cc: '',
      templateId: configService.get<string>('EMAIL_RESET_PASSWORD_TEMPLATE_ID'),
      dynamicTemplateData: {
        link: `http://localhost:3000/users/forgotPassword/${userInfo.id}`,
      },
    };
    return SendGrid.send(mail);
  }

  changePassword(userId, newPassword) {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    return this.usersRepository.query(
      `UPDATE users SET password_hash = '${hashedPassword}' WHERE id = '${userId}'`,
    );
  }

  userLogin(userInfo) {
    return this.usersRepository
      .query(
        `select password_hash, is_verified from users where email like '${userInfo.email}'`,
      )
      .then((data) => {
        if (data[0] && data[0].is_verified) {
          if (bcrypt.compareSync(userInfo.password, data[0].password_hash)) {
            return this.usersRepository.query(
              `select * from users where email like '${userInfo.email}'`,
            );
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
  }

  userSubscribe(userInfo) {
    this.usersRepository.query(
      `UPDATE users SET is_sub = '1' WHERE id = '${userInfo.id}'`,
    );
  }

  getSubscribedEmails() {
    return this.usersRepository.query(
      `SELECT email FROM users WHERE is_sub = '1'`,
    );
  }

  verifyEmail(userId) {
    this.usersRepository.query(
      `UPDATE users SET is_verified = '1' WHERE id = '${userId}'`,
    );
  }
}
