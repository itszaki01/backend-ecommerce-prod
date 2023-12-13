"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategoryValidator = exports.updateSubCategoryValidator = exports.getSubCategoryValidator = exports.getAllSubCategoryValidator = exports.createSubCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMw_1 = require("../../middlewares/validatorMw");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const applySlugify_1 = require("../../middlewares/applySlugify");
const idChecker_1 = require("../checkers/idChecker");
const SubCategoryModal_1 = require("../../models/SubCategoryModal");
const CategoryModal_1 = require("../../models/CategoryModal");
const subCategoryIdPass = (0, express_async_handler_1.default)((req, res, next) => {
    if (req.params.categoryID)
        req.body.category = req.params.categoryID;
    next();
});
exports.createSubCategoryValidator = [
    subCategoryIdPass,
    (0, express_validator_1.check)("category")
        .isMongoId()
        .withMessage("Invalid Category id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(CategoryModal_1.CategoryModal, value);
    }),
    (0, express_validator_1.check)("name", "Name is required").notEmpty().isLength({ min: 2 }).withMessage("Too Short SubCategory name"),
    validatorMw_1.validatorMw,
];
exports.getAllSubCategoryValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid SubCategory id format")
        .optional()
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(SubCategoryModal_1.SubCategory, value);
    }),
    (0, express_validator_1.check)("categoryID")
        .isMongoId()
        .withMessage("Invalid SubCategory id format")
        .optional()
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(CategoryModal_1.CategoryModal, value);
    }),
    validatorMw_1.validatorMw,
];
exports.getSubCategoryValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid SubCategory id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(SubCategoryModal_1.SubCategory, value);
    }),
    validatorMw_1.validatorMw,
];
exports.updateSubCategoryValidator = [
    applySlugify_1.applySlugify,
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid SubCategory id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(SubCategoryModal_1.SubCategory, value);
    }),
    (0, express_validator_1.check)("category", "SubCategory must be belong to category")
        .notEmpty()
        .isMongoId()
        .withMessage("Invalid SubCategory id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(CategoryModal_1.CategoryModal, value);
    }),
    (0, express_validator_1.check)("name", "Name is required").notEmpty().isLength({ min: 2 }).withMessage("Too Short SubCategory name"),
    validatorMw_1.validatorMw,
];
exports.deleteSubCategoryValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid SubCategory id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(SubCategoryModal_1.SubCategory, value);
    }),
    validatorMw_1.validatorMw,
];
