const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
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

const faculty = mongoose.model('faculty', facultySchema);
module.exports = faculty;