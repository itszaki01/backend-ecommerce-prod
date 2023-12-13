"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWishListOfLoggedUsre = exports.removeProductFromWishList = exports.addProductToWishList = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModal_1 = require("../models/UserModal");
//==========================================
/**
 *  @description Add Product to wishtlist
 *  @route POST /api/v1/wishlist
 *  @access Private/Protected
 */
//==========================================
exports.addProductToWishList = (0, express_async_handler_1.default)(async (req, res) => {
    const _req = req;
    //$addToSet used to push data to db array and if the same data is already exist it will not duplicate it
    const user = await UserModal_1.User.findByIdAndUpdate(_req.user._id, { $addToSet: { wishlist: req.body.productId } }, { new: true });
    res.json({ status: "sucess", message: "Product added succesfuly to wishlist", data: user });
});
//==========================================
/**
 *  @description Remove Product form wishtlist
 *  @route DELETE /api/v1/wishlist
 *  @access Private/Protected
 */
//==========================================
exports.removeProductFromWishList = (0, express_async_handler_1.default)(async (req, res) => {
    const _req = req;
    //$pull user to remove data from array in mongo db
    const user = await UserModal_1.User.findByIdAndUpdate(_req.user._id, { $pull: { wishlist: req.params.id } }, { new: true });
    res.json({ status: "sucess", message: "Product removed succesfuly from your wishlist", data: user });
});
//==========================================
/**
 *  @description get all logged user wishlsit
 *  @route GET /api/v1/wishlist
 *  @access Private/Protected
 */
//==========================================
exports.getAllWishListOfLoggedUsre = (0, express_async_handler_1.default)(async (req, res) => {
    const _req = req;
    //$addToSet used to push data to db array and if the same data is already exist it will not duplicate it
    const user = await UserModal_1.User.findById(_req.user._id).populate("wishlist");
    res.json({ results: user?.wishlist.length, data: user?.wishlist });
});
