const nodemailer = require('nodemailer');

// Create a transporter object using SMTP
let transporter = nodemailer.createTransport({
    host: 'mail.floridaaduservices.com', // Replace with your SMTP host
    port: 465, // Replace with your SMTP port (465 for SSL, 587 for TLS)
    secure: true, // Use true for port 465, false for other ports
    auth: {
        user: 'iamrahul4u@floridaaduservices.com', // Replace with your SMTP username
        pass: '%4$_tEtP+i6j', // Replace with your SMTP password
    },
});

// Setup email data
const toEmails=["brandedgabru99@gmail.com","erenyeagerff04@gmail.com"];
let mailOptions = {
    from: '"Your Name" <iamrahul4u@floridaaduservices.com>', // Replaf ce with your sender's name and email
    to: toEmails, // Replace with the recipient's email
    subject: 'Hello from cPanel SMTP', // Subject line
    text: 'This is a test email sent using cPanel SMTP with Nodemailer!', // Plain text body
    html: '<b>This is a test email sent using cPanel SMTP with Nodemailer!</b>', // HTML body
};

// Send mail with the defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', JSON.stringify(info));
});
