import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'fed5a43b473b95',
    pass: 'ca3619ba36dba5',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Feedget Team <hi@feedget.com>',
      to: 'Walter Alcantara <walter.m.alcantara@gmail.com>',
      subject: subject,
      html: body,
    });
  }
}
