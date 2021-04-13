const mongoose = require('mongoose');

const uniAdminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false,
            unique: true
        },
        password: {
            type: String,
            required: false
        },
        session_id:{
            type:String
        }
        

    }
)

const uniAdmin = mongoose.model('uniAdmin', uniAdminSchema);
module.exports = uniAdmin;