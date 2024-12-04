const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "./../config.env" });

const sendmail = async (options) => {
  const htmlTemplate = `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Fulltoss</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #f7941d;">Welcome to Fulltoss!</h1>
        <p>Dear ${options.name},</p>
        <p>We’re thrilled to have you join our growing community of IPL enthusiasts and cricket fans. At Fulltoss, we bring you official team merchandise, unique fan gear, and everything you need to support your favorite IPL team in style.</p>
        
        <h2>Here’s what you can do next:</h2>
        <ul>
            <li><strong>Explore Official IPL Merchandise:</strong> Browse exclusive jerseys, caps, accessories, and more for your favorite teams.</li>
            <li><strong>Stay Updated:</strong> Subscribe to our newsletter for updates on new arrivals, discounts, and special offers.</li>
        </ul>
        
        <p>We’re here to make your shopping experience seamless and enjoyable. If you have any questions or need assistance, don’t hesitate to reach out to our support team at <a href="mailto:${process.env.EMAIL_ID}" style="color: #0078d4;">this email</a>.</p>
        
        <p>Thank you for choosing Fulltoss. Celebrate the IPL season with unmatched passion and style!</p>

        <p>Cheers to your team’s success!<br><br>
        Best regards,<br>
        The Fulltoss Team</p>
    </div>
</body>
</html>
`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_AUTH,
    },
  });

  const mailoptions = {
    from: process.env.EMAIL_ID,
    to: options.email,
    subject: options.subject,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailoptions);
};

module.exports = sendmail;
