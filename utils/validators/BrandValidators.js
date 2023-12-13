"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrandValidator = exports.updateBrandValidator = exports.getBrandValidator = exports.createBrandValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMw_1 = require("../../middlewares/validatorMw");
const applySlugify_1 = require("../../middlewares/applySlugify");
const BrandModal_1 = require("../../models/BrandModal");
const idChecker_1 = require("../checkers/idChecker");
exports.createBrandValidator = [
    applySlugify_1.applySlugify,
    (0, express_validator_1.check)("name", "Name is required")
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Too shoter brand name")
        .isLength({ max: 32 })
        .withMessage("Too long brand name"),
    validatorMw_1.validatorMw,
];
exports.getBrandValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid brand id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(BrandModal_1.Brand, value);
    }),
    validatorMw_1.validatorMw,
];
exports.updateBrandValidator = [
    applySlugify_1.applySlugify,
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid brand id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(BrandModal_1.Brand, value);
    }),
    (0, express_validator_1.check)("name", "Name is required")
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Too short brand name")
        .isLength({ max: 32 })
        .withMessage("Too long brand name"),
    validatorMw_1.validatorMw,
];
exports.deleteBrandValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid brand id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(BrandModal_1.Brand, value);
    }),
    validatorMw_1.validatorMw,
];
