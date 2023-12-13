"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoggedUserProfile = exports.updateLoggedUserPassword = exports.getLoggedUserData = exports.deleteUser = exports.changePassword = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handlersFactory_1 = require("../helpers/handlersFactory");
const UserModal_1 = require("../models/UserModal");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//==========================================
/**
 *  @description Get all Users
 *  @route GET /api/v1/user
 *  @access Private
 */
//==========================================
exports.getAllUsers = (0, handlersFactory_1.getAll)(UserModal_1.User);
//==========================================
/**
 *  @description Get User by ID
 *  @route GET /api/v1/users/:id
 *  @access Private
 */
//==========================================
exports.getUser = (0, handlersFactory_1.getOne)(UserModal_1.User);
//==========================================
/**
 *  @description Create User
 *  @route POST /api/v1/users/
 *  @access Private
 */
//==========================================
exports.createUser = (0, handlersFactory_1.createOne)(UserModal_1.User);
//==========================================
/**
 *  @description Update User by ID
 *  @route PUT /api/v1/users/:id
 *  @access Private
 */
//==========================================
exports.updateUser = (0, handlersFactory_1.updateOne)(UserModal_1.User);
//==========================================
/**
 *  @description change password by userID
 *  @route PUT /api/v1/users/changepassword/:id
 *  @access Private
 */
//==========================================
exports.changePassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { password } = req.body;
    await UserModal_1.User.findByIdAndUpdate(req.params.id, {
        password: await bcryptjs_1.default.hash(password, 12),
        passwordChangedAt: Date.now(),
    });
    res.status(200).json({
        status: "success",
        message: "Password changed successfully",
    });
});
//==========================================
/**
 *  @description Delete User by ID
 *  @route DELETE /api/v1/users/:id
 *  @access Private
 */
//==========================================
exports.deleteUser = (0, handlersFactory_1.deleteOne)(UserModal_1.User);
//==========================================
/**
 *  @description Get Logged User Data
 *  @route GET /api/v1/users/getMe
 *  @access Private/Protected
 */
//==========================================
// @ts-ignore
exports.getLoggedUserData = (0, express_async_handler_1.default)(async (req, res, next) => {
    req.params.id = req.user._id;
    next();
});
//==========================================
/**
 *  @description Update Logged User Password
 *  @route GET /api/v1/users/changeMyPasswrod/:id
 *  @access Private/Protected
 */
//==========================================
// @ts-ignore
exports.updateLoggedUserPassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { password } = req.body;
    await UserModal_1.User.findByIdAndUpdate(req.user._id, {
        password: await bcryptjs_1.default.hash(password, 12),
        passwordChangedAt: Date.now(),
    });
    res.status(200).json({
        status: "success",
        message: "Password changed successfully",
    });
});
//==========================================
/**
 *  @description Update Logged User Profile
 *  @route PUT /api/v1/users/updateProfile/:id
 *  @access Private/Protected
 */
//==========================================
// @ts-ignore
exports.updateLoggedUserProfile = (0, express_async_handler_1.default)(async (req, res, next) => {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        slug: req.body.slug,
    };
    req.body = payload;
    //@ts-ignore
    req.params.id = req.user._id;
    console.log(req.body);
    next();
});
