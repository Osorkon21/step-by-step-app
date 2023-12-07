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
    }
});


module.exports = stepSchema;

