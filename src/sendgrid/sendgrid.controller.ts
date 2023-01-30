import { Body, Controller, Post } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';

@Controller('mail')
export class SendgridController {
  constructor(private readonly sendgridService: SendgridService) {}

  @Post('send')
  async sendEmail(
    @Body()
    emailValues,
  ) {
    const mail = {
      from: 'gormark2001@gmail.com',
      cc: '',
      dynamicTemplateData: {
        text: emailValues.email.replace(/\n/g, '<br>'),
        songLink1: emailValues.songLink1,
        songLink2: emailValues.songLink2,
        songLink3: emailValues.songLink3,
      },
    };

    return await this.sendgridService.send(mail);
  }
}
