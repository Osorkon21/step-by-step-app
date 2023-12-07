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

const Step = model('Step', stepSchema);

module.exports = Step;

// QUestion for group: do the steps need to be a model? Or should we just leave it as a standalone schema? I can't think of a reason we would be accessing its data outside of its association with Goals. Let me know what you all think! -LT
