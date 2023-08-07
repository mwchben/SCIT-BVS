const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Admin schema
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {                            //Admin mail
        type: String,
        required: true
    },
    password: {                         //Admin pass
        type: String,
        required: true
    }
});
// hash user password before saving into database
AdminSchema.pre('save', function(cb){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    cb();
});
module.exports = mongoose.model('AdminList', AdminSchema);