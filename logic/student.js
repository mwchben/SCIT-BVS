const StudentModel = require('../database/models/student');
const bcrypt = require('bcrypt');

const path = require('path');

const nodemailer = require('nodemailer');

const saltRounds = 10;

module.exports = {
    create: function (req, res, cb) {
        StudentModel.findOne(
            { email: req.body.email, election_address: req.body.election_address },
            function (err, result) {
                if (err) {
                    cb(err);
                } else {
                    if (!result) {
                        StudentModel.create(
                            {
                                email: req.body.email,
                                password: req.body.email,
                                election_address: req.body.election_address,
                            },
                            function (err, student) {
                                if (err) cb(err);
                                else {

                                    const transporter = nodemailer.createTransport({
                                        service: 'gmail',

                                        auth: {
                                            user: process.env.EMAIL,

                                            pass: process.env.PASSWORD,
                                        },
                                    });

                                    const mailOptions = {
                                        from: process.env.EMAIL, // sender address

                                        to: student.email, // list of receivers

                                        subject: 'Voter Registration', // Subject line

                                        html:
                                            'Hello,<br>'+ 
                                            'We’d like to notify you of your elligibility for the' + req.body.election_name + 'Election <br>' + 

                                            + 'Your ID will be: '+
                                            student.email +
                                            '</br>'  + 

                                            '<br>'+ 'Your Password Phrase will be: '+
                                            student.password +
                                            '</br>' +

                                            '<br><br><a href="http://localhost:3000/homepage">Click here to visit the website</a></br>', // plain text body
                                    };

                                    transporter.sendMail(mailOptions, function (err, info) {
                                        if (err) {
                                            res.json({
                                                status: 'error',
                                                message: 'Student voter could not be added',
                                                data: null,
                                            });
                                        } else {

                                            res.json({
                                                status: 'success',
                                                message: 'Student voter added successfully!!!',
                                                data: null,
                                            });
                                        }
                                    });
                                }
                            }
                        );
                    } else {
                        res.json({ status: 'error', message: 'Student voter already exists ', data: null });
                    }
                }
            }
        );
    },

    authenticate: function (req, res, cb) {
        StudentModel.findOne({ email: req.body.email, password: req.body.password }, function (err, studentInfo) {
            if (err) cb(err);
            else {
                if (studentInfo)
                    res.json({
                        status: 'success',
                        message: 'Student voter found!!!',
                        data: { id: studentInfo._id, election_address: studentInfo.election_address },
                    });
                //res.sendFile(path.join(__dirname+'/index.html'));
                else {
                    res.json({ status: 'error', message: 'Invalid email/password!!!', data: null });
                }
            }
        });
    },

    getAll: function (req, res, cb) {
        let studentList = [];

        StudentModel.find({ election_address: req.body.election_address }, function (err, students) {
            if (err) cb(err);
            else {
                for (let student of students) studentList.push({ id: student._id, email: student.email });

                let count = studentList.length;

                res.json({
                    status: 'success',
                    message: 'Student voters list found!!!',
                    data: { students: studentList },
                    count: count,
                });
            }
        });
    },

    updateById: function (req, res, cb) {
        StudentModel.findOne({ email: req.body.email }, function (err, result) {
            if (err) {
                cb(err);
            } else {
                if (!result) {
                    let password = bcrypt.hashSync(req.body.email, saltRounds);
                    StudentModel.findByIdAndUpdate(
                        req.params.studentId,
                        { email: req.body.email, password: password },
                        function (err, student) {
                            if (err) cb(err);
                        }
                    );
                    StudentModel.findById(req.params.studentId, function (err, studentInfo) {
                        if (err) cb(err);
                        else {
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.EMAIL,
                                    pass: process.env.PASSWORD,
                                },
                            });
                            const mailOptions = {
                                from: process.env.EMAIL, // sender address
                                to: studentInfo.email, // list of receivers
                                subject: req.body.election_name, // Subject line
                                html:
                                    req.body.election_description +
                                    '<br>Your voting id is:' +
                                    studentInfo.email +
                                    '<br>' +
                                    'Your password is:' +
                                    studentInfo.password +
                                    '<br><a href="url">Click here to visit the website</a>', // plain text body
                            };
                            transporter.sendMail(mailOptions, function (err, info) {
                                if (err) {
                                    res.json({ status: 'error', message: 'Student voter could not be added', data: null });
                                } else {
                                    res.json({
                                        status: 'success',
                                        message: 'Student voter updated successfully!!!',
                                        data: null,
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.json({ status: 'error', message: 'Student voter already exists ', data: null });
                }
            }
        });
    },

    deleteById: function (req, res, cb) {
        StudentModel.findByIdAndRemove(req.params.studentId, function (err, studentInfo) {
            if (err) cb(err);
            else {
                res.json({ status: 'success', message: 'Student voter deleted successfully!!!', data: null });
            }
        });
    },

    resultMail: function (req, res, cb) {
        StudentModel.find({ election_address: req.body.election_address }, function (err, students) {
            if (err) cb(err);
            else {
                const election_name = req.body.election_name;

                const winner_candidate = req.body.winner_candidate;

                const transporter = nodemailer.createTransport({
                    service: 'gmail',

                    auth: {
                        user: process.env.EMAIL,

                        pass: process.env.PASSWORD,
                    },
                });
                console.log("Winner candidate", winner_candidate, req.body.candidate_email);

                if(!winner_candidate || !req.body.candidate_email){

                    res.json({ status: 'error', message: 'No winner candidate! Emails to candidates and student voters have not been dispatched. ', data: null });
                    return
                }

                if(!students.length){

                    res.json({ status: 'error', message: 'No student voters were added! Emails to candidates and student voters have not been dispatched. ', data: null });
                    return
                }


                for (let student of students) {

                    const mailOptions = {
                        from: process.env.EMAIL, // sender address

                        to: student.email, // list of receivers

                        subject: 'Election results', // Subject line

                        html:
                            'The results of ' +
                            election_name +
                            ' are out.<br>The winner candidate is: <b>' +
                            winner_candidate +
                            '</b>.',
                    };

                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            res.json({ status: 'error', message: 'mail error', data: null });
                        } else console.log(info);

                        res.json({ status: 'success', message: 'mails sent successfully!!!', data: null });
                    });
                }

                const mailOptions = {
                    from: process.env.EMAIL, // sender address

                    to: req.body.candidate_email, // winner

                    subject: 'Election Outcome!', // Subject line

                    html: 'Congratulations you won ' + req.body.election_name + ' election.', // plain text body

                  
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        res.json({ status: 'error', message: 'mail error', data: null });

                    } else console.log(info);

                    res.json({ status: 'success', message: 'mail sent successfully!!!', data: null });
                });
            }
        });
    },
};
