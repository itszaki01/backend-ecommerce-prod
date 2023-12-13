"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorMw = void 0;
const express_validator_1 = require("express-validator");
const validatorMw = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errosLength = errors.array().length;
        let message = "";
        if (errosLength > 1) {
            errors.array().map((err, i) => (message += `${i + 1}: ${err.msg} ${errosLength != i + 1 ? "& " : ""}`));
        }
        else {
            message = `${errors.array()[0].msg}`;
        }
        return res.status(400).json({
            status: "fail",
            message: message.trimEnd(),
            totalErrors: errosLength,
            errors: errors.array(),
        });
    }
    next();
};
exports.validatorMw = validatorMw;
