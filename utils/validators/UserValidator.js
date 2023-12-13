"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoggedUserPasswordValidator = exports.updateLoggedUserProfileValidator = exports.deleteUserValidator = exports.getUserValidator = exports.changePasswordValidator = exports.updateUserValidator = exports.creatUserValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMw_1 = require("../../middlewares/validatorMw");
const applySlugify_1 = require("../../middlewares/applySlugify");
const idChecker_1 = require("../checkers/idChecker");
const UserModal_1 = require("../../models/UserModal");
const uniqueChecker_1 = require("../checkers/uniqueChecker");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.creatUserValidator = [
    applySlugify_1.applySlugify,
    (0, express_validator_1.check)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (value) => await (0, uniqueChecker_1.uniqueChecker)(UserModal_1.User, { data: { email: value }, field: "Email" })),
    (0, express_validator_1.check)("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    (0, express_validator_1.check)("passwordConfirm")
        .notEmpty()
        .withMessage("Password confirm is required").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirm does not match password");
        }
        else {
            return true;
        }
    }),
    (0, express_validator_1.check)("phone")
        .isMobilePhone("any")
        .withMessage("Invalid phone number")
        .custom(async (value) => await (0, uniqueChecker_1.uniqueChecker)(UserModal_1.User, { data: { phone: value }, field: "Phone number" })),
    validatorMw_1.validatorMw,
];
exports.updateUserValidator = [
    applySlugify_1.applySlugify,
    (0, express_validator_1.check)('password').isEmpty().withMessage("Please use /changePassword to update password"),
    (0, express_validator_1.check)("name").optional().notEmpty().withMessage("Name is required"),
    (0, express_validator_1.check)("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (value) => await (0, uniqueChecker_1.uniqueChecker)(UserModal_1.User, { data: { email: value }, field: "Email" })),
    (0, express_validator_1.check)("phone")
        .optional()
        .isMobilePhone("any")
        .withMessage("Invalid phone number")
        .custom(async (value) => await (0, uniqueChecker_1.uniqueChecker)(UserModal_1.User, { data: { phone: value }, field: "Phone number" })),
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid ID")
        .custom(async (value) => await (0, idChecker_1.idChecker)(UserModal_1.User, value)),
    validatorMw_1.validatorMw,
];
exports.changePasswordValidator = [
    (0, express_validator_1.check)("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.check)("passwordConfirm")
        .notEmpty()
        .withMessage("Password confirm is required").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirm does not match password");
        }
        else {
            return true;
        }
    }),
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid ID")
        .custom(async (value) => await (0, idChecker_1.idChecker)(UserModal_1.User, value)),
    //create burrent password validator
    (0, express_validator_1.check)('currentPassword').notEmpty().withMessage("Current password is required").custom(async (value, { req }) => {
        const user = await UserModal_1.User.findById(req.params?.id).select('+password');
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await bcryptjs_1.default.compare(value, user.password);
        if (!isMatch) {
            throw new Error("Current password is incorrect");
        }
        return true;
    }),
    validatorMw_1.validatorMw,
];
exports.getUserValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid ID")
        .custom(async (value) => await (0, idChecker_1.idChecker)(UserModal_1.User, value)),
    validatorMw_1.validatorMw,
];
exports.deleteUserValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid ID")
        .custom(async (value) => await (0, idChecker_1.idChecker)(UserModal_1.User, value)),
    validatorMw_1.validatorMw,
];
exports.updateLoggedUserProfileValidator = [
    applySlugify_1.applySlugify,
    (0, express_validator_1.check)("name").optional(),
    (0, express_validator_1.check)("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (value) => await (0, uniqueChecker_1.uniqueChecker)(UserModal_1.User, { data: { email: value }, field: "Email" })),
    (0, express_validator_1.check)("phone")
        .optional()
        .isMobilePhone("any")
        .withMessage("Invalid phone number")
        .custom(async (value) => await (0, uniqueChecker_1.uniqueChecker)(UserModal_1.User, { data: { phone: value }, field: "Phone number" })),
    validatorMw_1.validatorMw,
];
exports.updateLoggedUserPasswordValidator = [
    (0, express_validator_1.check)("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.check)("passwordConfirm")
        .notEmpty()
        .withMessage("Password confirm is required").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirm does not match password");
        }
        else {
            return true;
        }
    }),
    (0, express_validator_1.check)('currentPassword').notEmpty().withMessage("Current password is required").custom(async (value, { req }) => {
        const user = await UserModal_1.User.findById(req.user._id).select('+password');
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await bcryptjs_1.default.compare(value, user.password);
        if (!isMatch) {
            throw new Error("Current password is incorrect");
        }
        return true;
    }),
    validatorMw_1.validatorMw,
];
