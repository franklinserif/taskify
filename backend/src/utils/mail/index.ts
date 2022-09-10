/**
 * Mailer utility to send emails
 * @module utils/mail
 */

import config from "../../config";
import nodemailer from "nodemailer";
import { IMail } from "index.type";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: config.mailHost,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.mailEmail, // generated ethereal user
    pass: config.mailPassword, // generated ethereal password
  },
});

/**
 *
 */
const sendEmail = async (mail: IMail) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Taskify 👻" <franklinserif@gmail.com>', // sender address
    to: mail.to.join(", "), // list of receivers
    subject: mail.subject, // Subject line
    text: mail.text, // plain text body
    html: mail.html, // html body
  });

  console.log("mail info:", info.accepted);
};

export default sendEmail;
