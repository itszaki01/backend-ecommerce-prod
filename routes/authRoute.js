"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const authService_1 = require("../services/authService");
const authValidators_1 = require("../utils/validators/authValidators");
const router = express_1.default.Router();
exports.authRoute = router;
router.route("/signup").post(authValidators_1.signUpValidator, authService_1.signup);
router.route("/login").post(authValidators_1.logInValidator, authService_1.login);
router.post('/forgotPassword', authValidators_1.forgotPasswordValidator, authService_1.forgotPassword);
router.put('/resetPassword', authValidators_1.resetPasswordValidator, authService_1.resetPassword);
