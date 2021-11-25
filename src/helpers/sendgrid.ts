import { MailService } from "@sendgrid/mail";
import { SENDGRID_API_KEY, PORT } from "../config";
import { IMail } from ".";

const mailService = new MailService();
mailService.setApiKey(SENDGRID_API_KEY as string);

const getHtmlMailContent = (verificationToken: string): string => {
  return (
    `<h1>Hello, dear guest!</h1>` +
    `<h2>Welcome to our PhoneBook <b>Application</b>` +
    `</h2><p>Please complete your registration by clicking ` +
    `<a href='http://localhost:${PORT}/api/users/verify/${verificationToken}'` +
    `>THIS LINK</a></p><p>We appreciate for your ` +
    `connection!</p><h3>Have a nice day!</h3>`
  );
};

const prepareMail = (email: string, html: string): IMail => {
  return {
    to: email,
    from: "gennadiy_mariev@ukr.net",
    subject: "Registration verification",
    html: html,
  };
};

export { mailService, getHtmlMailContent, prepareMail };
