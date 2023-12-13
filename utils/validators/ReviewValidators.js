"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewValidator = exports.getReviewValidator = exports.updateReviewValidator = exports.createReviewValidator = void 0;
const express_validator_1 = require("express-validator");
const idChecker_1 = require("../checkers/idChecker");
const ProductModal_1 = require("../../models/ProductModal");
const validatorMw_1 = require("../../middlewares/validatorMw");
const belongChecker_1 = require("../checkers/belongChecker");
const ReviewModal_1 = require("../../models/ReviewModal");
exports.createReviewValidator = [
    (0, express_validator_1.check)("rating", "Rating is required")
        .notEmpty()
        .isNumeric()
        .withMessage("Rating must be a number")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),
    (0, express_validator_1.check)("title", "Title is required").notEmpty().isLength({ min: 5, max: 100 }).withMessage("Title must be between 5 and 100 characters"),
    (0, express_validator_1.check)("product", "Product is required")
        .notEmpty()
        .custom(async (value, { req }) => {
        return await (0, idChecker_1.idChecker)(ProductModal_1.Product, value);
    }),
    (0, express_validator_1.check)("user", "User is required").isMongoId().withMessage("Invalid user id format")
    // .custom(async (value, { req }) => {
    //     const _req = req as any;
    //     return await uniqueChecker(Review, { data:{user: value, product: _req.body.product},field:'Your review' })
    // },)
    ,
    validatorMw_1.validatorMw,
];
exports.updateReviewValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid review id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(ReviewModal_1.Review, value);
    })
        .custom(async (value, { req }) => {
        const _req = req;
        const userID = _req.user._id;
        return await (0, belongChecker_1.belongChecker)(ReviewModal_1.Review, { data: value, role: _req.user.role }, userID);
    }),
    (0, express_validator_1.check)("rating", "Rating is required")
        .optional()
        .isNumeric()
        .withMessage("Rating must be a number")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),
    (0, express_validator_1.check)("title", "Title is required").optional().isLength({ min: 5, max: 100 }).withMessage("Title must be between 5 and 100 characters"),
    validatorMw_1.validatorMw,
];
exports.getReviewValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid review id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(ReviewModal_1.Review, value);
    }),
    validatorMw_1.validatorMw,
];
exports.deleteReviewValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid review id format")
        .custom(async (value) => {
        return await (0, idChecker_1.idChecker)(ReviewModal_1.Review, value);
    })
        .custom(async (value, { req }) => {
        const _req = req;
        const userID = _req.user._id;
        return await (0, belongChecker_1.belongChecker)(ReviewModal_1.Review, { data: value, role: _req.user.role }, userID);
    }),
    validatorMw_1.validatorMw,
];
