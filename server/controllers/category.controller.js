const { Goal, Category } = require('../models');
const Model = Category;

// get all categories
async function getAllItems(req, res) {
    try {
        const categories = await Model.find()
            .select('-__v')
            .populate('goals')
        res.json(categories);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// get one category by id
async function getItemById(req, res) {
    try {
        const category = await Model.findOne({ _id: req.params._id })

        if (!category) {
            return res.status(404).json({ message: 'No category with that ID' })
        }

        res.json(category);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// create a category
async function createItem(req, res) {
    try {
        return await Model.create(req.body);
    } catch (err) {
        throw new Error(err)
    }
}

// update a category by its id
async function updateItemById(req, res) {
    try {
        const category = await Model.findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { runValidators: true, new: true }
        )

        if (!category) {
            return res.status(404).json({ message: 'No category with that ID' })
        }

        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// delete a category
async function deleteItemById(req, res) {
    try {
        const category = await Model.findOneAndDelete({ _id: req.params._id });

        if (!category) {
            return res.status(404).json({ message: 'No such category exists' });
        }

        res.json({ message: 'Category successfully deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getAllCategories: getAllItems,
    getCategoryById: getItemById,
    createCategory: createItem,
    updateCategoryById: updateItemById,
    deleteCategoryById: deleteItemById
}
