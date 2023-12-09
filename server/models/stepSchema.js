const { Schema, model } = require('mongoose');

const stepSchema = new Schema({
    stepsId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
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

