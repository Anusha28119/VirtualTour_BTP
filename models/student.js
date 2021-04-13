const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
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

const student = mongoose.model('student', studentSchema);
module.exports = student;