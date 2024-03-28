const { Schema } = require('mongoose');
// default 

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
        required: true,
        default: false
    },
    uuid: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        id: false,
    }
);


module.exports = stepSchema;

// step can be broken up into substeps? or no?
// completed boolean field

