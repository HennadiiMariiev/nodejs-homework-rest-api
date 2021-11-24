"use strict";
exports.__esModule = true;
var mail_1 = require("@sendgrid/mail");
var mailService = new mail_1.MailService();
mailService.setApiKey(
  "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"
);
var someLink = "http://google.com";
var testMail = {
  to: "marieff1990@gmail.com",
  from: "gennadiy_mariev@ukr.net",
  subject: "Please complete your registration",
  html:
    "<h2>Welcome to our PhoneBook <b>Application</b>" +
    "</h2><p>Please complete your registration by clicking " +
    ('<a href="' + someLink + '">THIS LINK</a></p><p>We appreciate your ') +
    "connection!</p><h3>Have a nice day!</h3>",
};
mailService
  .send(testMail)
  .then(function () {
    return console.log("Mail was successfully sent!");
  })
  ["catch"](function (err) {
    return console.log(err);
  });
