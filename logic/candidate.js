const path = require('path');
const nodemailer = require('nodemailer');

module.exports = {
    register: function (req, res, cb) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'Candidate Registration',
            html: 'We’d like to confirm that your candidate status was created successfully for the ' + req.body.election_name + ' election.',
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.json({ status: 'error', message: 'mail error', data: null });
                console.log(err);
            } else console.log(info);
            res.json({ status: 'success', message: 'mail sent successfully!!!', data: null });
        });
    },
};
