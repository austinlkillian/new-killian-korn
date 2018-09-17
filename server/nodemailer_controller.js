'use strict';
const nodemailer = require('nodemailer');

const {NODE_EMAIL, NODE_EMAIL_PASS} = process.env

module.exports={
sendEmail: (req, res) => {

    const {user_name, email} = req.session.user

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NODE_EMAIL,
            pass: NODE_EMAIL_PASS 
        }
    });

    let mailOptions = {
        from: "Killian Korn",
        to: `${email}`,
        subject: 'Order Confirmation',
        html: `<p style='color: crimson; font-size: 20px; font-weight: bold;font-style: Arial; background: white'>${user_name}, your order has been placed and will be shipped shortly!</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.sendStatus(200)
    });
}
}