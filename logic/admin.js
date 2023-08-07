const AdminModel = require('../database/models/admin');
const bcrypt = require('bcrypt');
const path = require('path');
module.exports = {
    create: function(req, res, cb) {
        AdminModel.findOne({email:req.body.email}, function(err, result) {
            if(err){
                cb(err);
            }
            else{
                if(!result){
                    console.log("no result")

                    AdminModel.create({ email: req.body.email, password: req.body.password }, function (err, result) {
                        console.log("got here")
                        if (err)
                            cb(err);
                        else{
                            AdminModel.findOne({email:req.body.email}, function(err, AdminInfo) {
                                console.log("created successfully")
                                if (err)
                                    cb(err);
                                else{
                                    res.json({status: "success", message: "Admin added successfully!!!", data:{id: AdminInfo._id}});
                                }
                            });
                        }
                    });
                }
                else{
                    res.json({status: "error", message: "Admin already exists ", data:null});
                }
            }

        });
    },
    authenticate: function(req, res, cb) {
        AdminModel.findOne({email:req.body.email}, function(err, AdminInfo){
            if (err)
                cb(err);
            else {
                console.log('sent', req.body.email, req.body.password, AdminInfo)
                if(AdminInfo && bcrypt.compareSync(req.body.password, AdminInfo.password) && AdminInfo.email === req.body.email) {

                    console.log("found it")

                    return res.json({status:"success", message: "Admin found!!!", data:{id: AdminInfo._id, email: AdminInfo.email}});
                }
                else {
                    console.log("not found")
                    return res.json({status:"error", message: "Invalid email/password!!!", data:null});
                }
            }
        });
    }
}