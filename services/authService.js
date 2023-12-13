"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.allowTo = exports.auth = exports.login = exports.signup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModal_1 = require("../models/UserModal");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = require("../utils/apiError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sendEmail_1 = require("../utils/sendEmail");
//==================================
/**
 *  @desc    Signup
 *  @route   POST /api/v1/auth/signup
 *  @access  Public
 */
//==================================
exports.signup = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { name, email, password, profileImg, phone, slug } = req.body;
    const user = await UserModal_1.User.create({
        name,
        slug,
        email,
        password,
        phone,
        profileImg,
    });
    const token = jsonwebtoken_1.default.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(201).json({
        data: user,
        token,
    });
});
//==================================
/**
 *  @desc    Login
 *  @route   POST /api/v1/auth/login
 *  @access  Public
 */
//==================================
exports.login = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user = await UserModal_1.User.findOne({ email: req.body.email }).select("+password");
    if (!user) {
        return next(new apiError_1.ApiError("Invalid email or password", 401));
    }
    const isMatch = await bcryptjs_1.default.compare(req.body.password, user?.password);
    if (!isMatch) {
        return next(new apiError_1.ApiError("Invalid email or password", 401));
    }
    const token = jsonwebtoken_1.default.sign({ userID: user?._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(200).json({
        data: user,
        token,
    });
});
//==================================
/**
 *  @desc    Auth
 *  @route   GET /api/v1/auth
 */
//==================================
//@ts-ignore
exports.auth = (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new apiError_1.ApiError("Please login to get access", 401));
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModal_1.User.findById(decoded.userID);
    if (!user) {
        return next(new apiError_1.ApiError("User not found", 404));
    }
    else if (user.passwordChangedAt.getTime() > decoded.iat * 1000) {
        return next(new apiError_1.ApiError("Password changed recently, please login again", 401));
    }
    req.user = user;
    next();
});
const allowTo = (...roles) => 
//@ts-ignore
(0, express_async_handler_1.default)(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new apiError_1.ApiError("You are not allowed to access this route", 403));
    }
    next();
});
exports.allowTo = allowTo;
//==================================
/**
 *  @desc    Forgot Password
 *  @route   POST /api/v1/auth/forgotPassword
 *  @access  Public
 */
//==================================
//@ts-ignore
exports.forgotPassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    //1. Check if user exists
    const user = await UserModal_1.User.findOne({ email: req.body.email });
    if (!user) {
        return next(new apiError_1.ApiError("no user found with this email", 404));
    }
    //3. Send the link with token to user's email
    const resetToken = jsonwebtoken_1.default.sign({ userEMAIL: req.body.email }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });
    const message = `click on this link to reset your password reset toke = http .... /resetPassword?token=${resetToken}`;
    try {
        await (0, sendEmail_1.sendEmail)({ to: user.email, text: message, subject: "Password reset Link" });
    }
    catch (error) {
        if (process.env.NODE_ENV === "DEV") {
            const _error = error;
            return next(new apiError_1.ApiError(`SMTP ERROR: ${_error.message}`, 500));
        }
        else {
            return next(new apiError_1.ApiError("Something went wrong, please try again later", 500));
        }
    }
    res.status(200).json({
        status: "success",
        message: "Password reset code sent to your email",
    });
});
//==================================
/**
 *  @desc    Reset Password
 *  @route   POST /api/v1/auth/resetPassword
 *  @access  Public
 */
//==================================
exports.resetPassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    //1. Get user based on the token
    const token = req.query.token;
    //when token is expired jwt.verify will throw an error automatically
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModal_1.User.findOne({ email: decoded.userEMAIL });
    if (!user) {
        return next(new apiError_1.ApiError("User not found", 404));
    }
    //2: check token if already used
    if (user.passwordChangedAt.getTime() > decoded.iat * 1000) {
        return next(new apiError_1.ApiError("Token already used", 401));
    }
    user.password = req.body.newPassword;
    user.passwordChangedAt = new Date(Date.now());
    await user.save();
    res.status(200).json({
        status: "success",
        menubar: "Password reset successfully, please login again",
    });
});
