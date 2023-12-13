"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryBelongCategoryChecker = exports.singleSubCategoryChecker = exports.multiSubCategoryChecker = void 0;
const SubCategoryModal_1 = require("../../models/SubCategoryModal");
const multiSubCategoryChecker = async (subCategories) => {
    const subCategoriesCheck = await SubCategoryModal_1.SubCategory.find({ _id: { $exists: true, $in: subCategories } });
    if (subCategoriesCheck.length != subCategories.length) {
        const checkedSubCategoriesArray = subCategoriesCheck.map((subC) => subC._id.toString());
        const invalidSubCategories = subCategories.filter((subC) => !checkedSubCategoriesArray.includes(subC));
        if (invalidSubCategories.length != 0) {
            return Promise.reject(new Error(`No SubCategory for this id's [ ${invalidSubCategories} ]`.replaceAll(",", " && ")));
        }
        else {
            true;
        }
    }
    else {
        return true;
    }
};
exports.multiSubCategoryChecker = multiSubCategoryChecker;
const singleSubCategoryChecker = async (id) => {
    const subcategory = await SubCategoryModal_1.SubCategory.findById(id);
    if (!subcategory) {
        return Promise.reject(new Error(`No SubCategory for this id ${id}`));
    }
    else {
        return true;
    }
};
exports.singleSubCategoryChecker = singleSubCategoryChecker;
//Check Category SubCategories if include subcategories in req.body
const subCategoryBelongCategoryChecker = async (currentSubCategories, { req }) => {
    const _req = req;
    const subcategories = await SubCategoryModal_1.SubCategory.find({ category: _req.body.category });
    const subCategoriesInDB = subcategories.map((subC) => subC._id.toString());
    const validate = currentSubCategories.filter((subC) => subCategoriesInDB.includes(subC));
    const inValid = currentSubCategories.filter((subC) => !subCategoriesInDB.includes(subC));
    if (validate.length != currentSubCategories.length) {
        return Promise.reject(new Error(`The Subcategories => [${inValid}] is not belong Category id ${_req.body.category}`.replaceAll(",", " && ")));
    }
    else {
        return true;
    }
};
exports.subCategoryBelongCategoryChecker = subCategoryBelongCategoryChecker;
