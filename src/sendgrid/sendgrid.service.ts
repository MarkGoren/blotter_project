import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SendgridService {
  constructor(private readonly userService: UsersService) {
    const configService = new ConfigService();
    SendGrid.setApiKey(configService.get<string>('SEND_GRID_KEY'));
  }

  async send(mail) {
    const configService = new ConfigService();
    mail.templateId = configService.get<string>('TEMPLATE_ID');
    return this.userService
      .getSubscribedEmails()
      .then(
        (data) =>
          (mail.personalizations = data.map((obj) => ({
            to: [obj.email],
          }))),
      )
      .then(() => {
        SendGrid.send(mail);
      });
  }
}
