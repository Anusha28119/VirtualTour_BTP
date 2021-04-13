const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false
        },
        submission: {
            type: String,
            required: false
        },
        approved: {
            type: Boolean,
            required: false
        },
        added: {
            type: Boolean,
            required: false
        }



    }
)

const message = mongoose.model('message', messageSchema);
module.exports = message;