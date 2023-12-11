const { Schema, Types, model } = require('mongoose');

const stepSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true
    }
});


module.exports = stepSchema;

// step can be broken up into substeps? or no?
// completed boolean field

