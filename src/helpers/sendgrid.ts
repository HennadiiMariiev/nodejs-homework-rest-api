import { MailService } from "@sendgrid/mail";
import { SENDGRID_API_KEY } from "../config";
import { IMail } from ".";

const mailService = new MailService();
mailService.setApiKey(SENDGRID_API_KEY as string);

const someLink: string = "http://google.com";

const testMail: IMail = {
  to: "marieff1990@gmail.com",
  from: "gennadiy_mariev@ukr.net",
  subject: "Please complete your registration",
  html:
    `<h2>Welcome to our PhoneBook <b>Application</b>` +
    `</h2><p>Please complete your registration by clicking ` +
    `<a href="${someLink}">THIS LINK</a></p><p>We appreciate your ` +
    `connection!</p><h3>Have a nice day!</h3>`,
};

mailService
  .send(testMail)
  .then(() => console.log("Mail was successfully sent!"))
  .catch((err) => console.log(err));
