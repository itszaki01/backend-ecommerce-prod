"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAddressesOfLoggedUser = exports.removeAddress = exports.addAddress = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModal_1 = require("../models/UserModal");
const apiError_1 = require("../utils/apiError");
//==========================================
/**
 *  @description Add Address
 *  @route POST /api/v1/addresses
 *  @access Private/Protected
 */
//==========================================
exports.addAddress = (0, express_async_handler_1.default)(async (req, res) => {
    const _req = req;
    //$addToSet used to push data to db array and if the same data is already exist it will not duplicate it
    const user = await UserModal_1.User.findByIdAndUpdate(_req.user._id, { $addToSet: { addresses: req.body } }, { new: true });
    res.json({ status: "sucess", message: "Address added succesfuly", data: user });
});
//==========================================
/**
 *  @description Remove Product form wishtlist
 *  @route DELETE /api/v1/wishlist
 *  @access Private/Protected
 */
//==========================================
exports.removeAddress = (0, express_async_handler_1.default)(async (req, res) => {
    const _req = req;
    //$pull user to remove data from array in mongo db
    const user = await UserModal_1.User.findByIdAndUpdate(_req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true });
    res.json({ status: "sucess", message: "Address removed succesfuly", data: user });
});
//==========================================
/**
 *  @description get all logged user wishlsit
 *  @route GET /api/v1/wishlist
 *  @access Private/Protected
 */
//==========================================
exports.getAllAddressesOfLoggedUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    //$addToSet used to push data to db array and if the same data is already exist it will not duplicate it
    const user = await UserModal_1.User.findById(_req.user._id);
    if (user?.addresses.length < 0) {
        return next(new apiError_1.ApiError("No addresses yet", 400));
    }
    res.json({ results: user?.addresses.length, data: user?.addresses });
});
