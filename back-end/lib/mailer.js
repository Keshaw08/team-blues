const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.BREVO_PORT || 587),
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

async function sendMail({ to, cc, bcc, subject, html, text }) {
  const from =
    process.env.MAIL_FROM || '"Rann Utsav Packages" <rannutsavpackages@gmail.com>';
  return transporter.sendMail({ from, to, cc, bcc, subject, html, text });
}

module.exports = { sendMail };
