"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryValidator = exports.updateCategoryValidator = exports.getCategoryValidator = exports.getCategoyAllSubCatigoriesValidator = exports.createCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMw_1 = require("../../middlewares/validatorMw");
const applySlugify_1 = require("../../middlewares/applySlugify");
const idChecker_1 = require("../checkers/idChecker");
const CategoryModal_1 = require("../../models/CategoryModal");
exports.createCategoryValidator = [
    applySlugify_1.applySlugify,
    (0, express_validator_1.check)("name")
        .notEmpty()
        .withMessage("category name is required")
        .isLength({ min: 6 })
        .withMessage("Too short category name")
        .isLength({ max: 32 })
        .withMessage("Too long category name"),
    validatorMw_1.validatorMw,
];
exports.getCategoyAllSubCatigoriesValidator = [(0, express_validator_1.check)("id").isMongoId().withMessage("Invalid category id format").custom(async (value) => {
        return await (0, idChecker_1.idChecker)(CategoryModal_1.CategoryModal, value);
    }), validatorMw_1.validatorMw];
exports.getCategoryValidator = [(0, express_validator_1.check)("id").isMongoId().withMessage("Invalid category id format").custom(async (value) => {
        return await (0, idChecker_1.idChecker)(CategoryModal_1.CategoryModal, value);
    }), validatorMw_1.validatorMw];
exports.updateCategoryValidator = [applySlugify_1.applySlugify, (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid category id format").custom(async (value) => {
        return await (0, idChecker_1.idChecker)(CategoryModal_1.CategoryModal, value);
    }), validatorMw_1.validatorMw];
exports.deleteCategoryValidator = [(0, express_validator_1.check)("id").isMongoId().withMessage("Invalid category id format").custom(async (value) => {
        return await (0, idChecker_1.idChecker)(CategoryModal_1.CategoryModal, value);
    }), validatorMw_1.validatorMw];
