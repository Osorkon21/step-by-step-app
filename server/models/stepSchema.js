const { Types, Schema, model } = require('mongoose');

const stepSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
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

