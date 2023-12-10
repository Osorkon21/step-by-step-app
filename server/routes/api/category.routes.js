const router = require('express').Router();

// Import any controllers needed here
const { getAllCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById } = require('../../controllers/category.controller');

// Declare the routes that point to the controllers above

router.route("/")
    .get(getAllCategories)
    .post(createCategory)

router.route("/:_id")
    .get(getCategoryById)
    .put(updateCategoryById)
    .delete(deleteCategoryById)


module.exports = router;