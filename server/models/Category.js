const { Schema, model, Types } = require('mongoose');

const categorySchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
        default: 'Misc.'
    },
    goals: [{
        type: Schema.Types.ObjectId,
        ref: 'Goal'
    }]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

categorySchema.virtual("goalsCount").get(function () {
    const glCount = this.goals.length;
    return glCount;
})

const Category = model('Category', categorySchema);

module.exports = Category;

// Categories will be: Social, Travel, Entertainment, Skill, Misc.

// Thread data: a Helper ID, Instructions, Response, Model
