const mongoose = require('mongoose');

const queriesSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: false
        },
        details: {
            type: String,
            required: false
        },
        session_id: {
            type: String,
            required: false
        }


    }
)

const queries = mongoose.model('queries', queriesSchema);
module.exports = queries;