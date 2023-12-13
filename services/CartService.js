"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCouponToCart = exports.updateQuantity = exports.clearCartItems = exports.removeItemFromCart = exports.getLoggedUserItems = exports.addItemToCart = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const CartModal_1 = require("../models/CartModal");
const ProductModal_1 = require("../models/ProductModal");
const apiError_1 = require("../utils/apiError");
const CouponModal_1 = require("../models/CouponModal");
exports.addItemToCart = (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    const { productId, color } = req.body;
    let cart = await CartModal_1.Cart.findOne({ user: _req.user._id });
    const product = await ProductModal_1.Product.findById(productId);
    if (!cart) {
        cart = await CartModal_1.Cart.create({ cartItems: [{ product: productId, color, price: product?.price }], user: _req.user._id });
    }
    else {
        const productIndex = cart.cartItems.findIndex((item) => item.product.toString() == productId && item.color == color);
        if (productIndex > -1) {
            cart.cartItems[productIndex].quantitiy += 1;
        }
        else {
            //@ts-ignore
            cart.cartItems.push({ product: productId, color, price: product.price });
        }
    }
    cart.totalCartPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantitiy, 0);
    await cart?.save();
    res.json({
        status: "sucess",
        message: "The item added succesfuly",
        data: cart,
    });
});
exports.getLoggedUserItems = (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    const cart = await CartModal_1.Cart.findOne({ user: _req.user._id });
    if (!cart) {
        return next(new apiError_1.ApiError("No cart for this user", 404));
    }
    await cart.save();
    res.json({
        sattus: "success",
        results: cart?.cartItems.length,
        data: cart,
    });
});
exports.removeItemFromCart = (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    const cart = await CartModal_1.Cart.findOneAndUpdate({ user: _req.user.id }, { $pull: { cartItems: { _id: _req.params.id } } });
    if (!cart)
        return next(new apiError_1.ApiError("no items with this id", 404));
    cart.totalCartPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantitiy, 0);
    res.status(200).json({
        sattus: "success",
        message: "Cart item removed",
        results: cart?.cartItems.length,
        data: cart,
    });
});
exports.clearCartItems = (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    const cart = await CartModal_1.Cart.findOneAndUpdate({ user: _req.user.id }, { cartItems: [] });
    if (!cart)
        return next(new apiError_1.ApiError("no items with this id", 404));
    cart.totalCartPrice = 0;
    res.status(200).json({
        sattus: "success",
        message: "Cart Cleared",
    });
});
exports.updateQuantity = (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    const { quantity } = _req.body;
    const cart = await CartModal_1.Cart.findOneAndUpdate({ user: _req.user.id });
    if (!cart)
        return next(new apiError_1.ApiError("no items with this id", 404));
    //@ts-ignore
    const itemIndex = cart.cartItems.findIndex((item) => item._id.toString() == req.params.id);
    if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantitiy = quantity;
    }
    cart.totalCartPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantitiy, 0);
    await cart.save();
    res.status(200).json({
        sattus: "success",
        message: "Cart Cleared",
        results: cart?.cartItems.length,
        data: cart,
    });
});
exports.applyCouponToCart = (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    const coupon = await CouponModal_1.Coupon.findOne({ name: req.body.coupon, expire: { $gt: Date.now() } });
    const cart = await CartModal_1.Cart.findOne({ user: _req.user._id });
    if (!cart)
        return next(new apiError_1.ApiError("no items with this id", 404));
    if (!coupon)
        return next(new apiError_1.ApiError("no coupon with this id", 404));
    const rate = 0.01 * coupon.discount;
    const discountAmount = rate * cart.totalCartPrice;
    cart.totalPriceAfterDiscount = cart.totalCartPrice - discountAmount;
    await cart.save();
    res.status(200).json({
        sattus: "success",
        message: "Cart Price Updated",
        results: cart?.cartItems.length,
        data: cart,
    });
});
