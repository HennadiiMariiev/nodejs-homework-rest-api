import nodemailer, { TransportOptions } from "nodemailer";
import {
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
  PORT,
} from "../config/config";

interface IMailService {
  transporter: nodemailer.Transporter<unknown>;
}

class MailService implements IMailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    } as TransportOptions);
  }

  async sendActivationMail(to: string, verificationToken: string) {
    await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: "Registration verification",
      text: "",
      html:
        `<h1>Hello, dear guest!</h1>` +
        `<h2>Welcome to our PhoneBook <b>Application</b>` +
        `</h2><p>Please complete your registration by clicking ` +
        `<a href='http://localhost:${PORT}/api/users/verify/${verificationToken}'` +
        `>THIS LINK</a></p><p>We appreciate for your ` +
        `connection!</p><h3>Have a nice day!</h3>`,
    });
  }
}

export const mailService = new MailService();
