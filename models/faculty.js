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
        }


    }
)

const faculty = mongoose.model('faculty', facultySchema);
module.exports = faculty;