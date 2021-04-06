const mongoose = require('mongoose');

const siteAdminSchema = new mongoose.Schema(
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

const siteAdmin = mongoose.model('siteAdmin', siteAdminSchema);
module.exports = siteAdmin;