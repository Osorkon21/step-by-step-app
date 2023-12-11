const { Schema } = require('mongoose');

const stepSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String
    },
    completed: {
        type: Boolean,
        required: true
    },
    uuid: {
        type: String,
        required: true
    }
});


module.exports = stepSchema;

// step can be broken up into substeps? or no?
// completed boolean field

