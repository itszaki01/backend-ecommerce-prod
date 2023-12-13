"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidator = exports.forgotPasswordValidator = exports.logInValidator = exports.signUpValidator = void 0;
const express_validator_1 = require("express-validator");
const applySlugify_1 = require("../../middlewares/applySlugify");
const uniqueChecker_1 = require("../checkers/uniqueChecker");
const UserModal_1 = require("../../models/UserModal");
const validatorMw_1 = require("../../middlewares/validatorMw");
exports.signUpValidator = [
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
    (0, express_validator_1.check)('role').isEmpty().withMessage("Role is not allowed"),
    validatorMw_1.validatorMw,
];
exports.logInValidator = [
    (0, express_validator_1.check)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.check)("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validatorMw_1.validatorMw
];
exports.forgotPasswordValidator = [
    (0, express_validator_1.check)("email").isEmail().withMessage("Invalid email"),
    validatorMw_1.validatorMw
];
exports.resetPasswordValidator = [
    (0, express_validator_1.check)("newPassword").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    (0, express_validator_1.check)("newPasswordConfirm")
        .notEmpty()
        .withMessage("Password confirm is required").custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error("Password confirm does not match password");
        }
        else {
            return true;
        }
    }),
    validatorMw_1.validatorMw
];
