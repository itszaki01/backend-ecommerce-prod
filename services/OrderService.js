"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookCheckout = exports.checkoutSession = exports.updateOrderDelivred = exports.updateOrderPayed = exports.getOrder = exports.getAllOrders = exports.createCashOrder = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const CartModal_1 = require("../models/CartModal");
const apiError_1 = require("../utils/apiError");
const OrderModal_1 = require("../models/OrderModal");
const ProductModal_1 = require("../models/ProductModal");
const handlersFactory_1 = require("../helpers/handlersFactory");
const UserModal_1 = require("../models/UserModal");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);
exports.createCashOrder = (0, express_async_handler_1.default)(async (req, res, next) => {
    const _req = req;
    //app settings
    let taxPrice = 0;
    let shippingPrice = 0;
    //1: get cart depend on cartId
    console.log(req.params.id);
    const cart = await CartModal_1.Cart.findById(req.params.id);
    if (!cart)
        return next(new apiError_1.ApiError("no cart for this id", 404));
    //2: get order price and check if there is a coupon
    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
    //3:create order with defual payment method cash
    const order = await OrderModal_1.Order.create({
        user: _req.user._id,
        cartItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        shippingPrice,
        taxPrice,
        totalOrderPrice,
    });
    //4: decrement products quntity and increase sold
    if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantitiy, sold: +item.quantitiy } },
            },
        }));
        //@ts-ignore
        await ProductModal_1.Product.bulkWrite(bulkOption, {});
        // 5) Clear cart depend on cartId
        await CartModal_1.Cart.findByIdAndDelete(req.params.id);
    }
    res.status(201).json({ status: "success", data: order });
});
exports.getAllOrders = (0, handlersFactory_1.getAll)(OrderModal_1.Order);
exports.getOrder = (0, handlersFactory_1.getOne)(OrderModal_1.Order);
exports.updateOrderPayed = (0, express_async_handler_1.default)(async (req, res, next) => {
    const order = await OrderModal_1.Order.findById(req.params.id);
    if (!order) {
        return next(new apiError_1.ApiError("No order for this id", 404));
    }
    order.isPaid = true;
    order.paidAt = new Date(Date.now());
    await order.save();
    res.status(201).json({ status: "success", data: order });
});
exports.updateOrderDelivred = (0, express_async_handler_1.default)(async (req, res, next) => {
    const order = await OrderModal_1.Order.findById(req.params.id);
    if (!order) {
        return next(new apiError_1.ApiError("No order for this id", 404));
    }
    order.isDelivred = true;
    order.delivredAt = new Date(Date.now());
    await order.save();
    res.status(201).json({ status: "success", data: order });
});
// @desc    Get checkout session from stripe and send it as response
// @route   GET /api/v1/orders/checkout-session/cartId
// @access  Protected/User
exports.checkoutSession = (0, express_async_handler_1.default)(async (req, res, next) => {
    // app settings
    const taxPrice = 0;
    const shippingPrice = 0;
    const _req = req;
    // 1) Get cart depend on cartId
    const cart = await CartModal_1.Cart.findById(req.params.cartId);
    if (!cart) {
        return next(new apiError_1.ApiError(`There is no such cart with id ${req.params.cartId}`, 404));
    }
    // 2) Get order price depend on cart price "Check if coupon apply"
    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
    // 3) Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "dzd",
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: _req.user.name,
                        description: "Comfortable cotton t-shirt",
                    },
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${req.protocol}://${req.get("host")}/orders`,
        cancel_url: `${req.protocol}://${req.get("host")}/cart`,
        customer_email: _req.user.email,
        client_reference_id: req.params.cartId,
        metadata: req.body.shippingAddress,
    });
    // 4) send session to response
    res.status(200).json({ status: "success", session });
});
const createCardOrder = async (session) => {
    console.log('order called');
    const cartId = session.data.client_reference_id;
    const userEmail = session.data.customer_email;
    const shippingAddress = session.data.metadata;
    //app settings
    let taxPrice = 0;
    let shippingPrice = 0;
    const cart = await CartModal_1.Cart.findById(cartId);
    const user = await UserModal_1.User.findOne({ email: userEmail });
    if (!user || !cart)
        return "wrong data";
    //2: get order price and check if there is a coupon
    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
    const order = await OrderModal_1.Order.create({
        user: user._id,
        cartItems: cart.cartItems,
        shippingAddress,
        shippingPrice,
        taxPrice,
        totalOrderPrice,
        isPaid: true,
        paidAt: new Date(Date.now()),
        paymentMethod: 'card'
    });
    //4: decrement products quntity and increase sold
    if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantitiy, sold: +item.quantitiy } },
            },
        }));
        //@ts-ignore
        await ProductModal_1.Product.bulkWrite(bulkOption, {});
        // 5) Clear cart depend on cartId
        await CartModal_1.Cart.findByIdAndDelete(cartId);
    }
};
exports.webhookCheckout = (0, express_async_handler_1.default)(async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        const _err = err;
        console.log(`Webhook Error: ${_err.message}`);
        response.status(400).send(`Webhook Error: ${_err.message}`);
        return;
    }
    if (event.type === "checkout.session.completed") {
        createCardOrder(event);
    }
    response.status(201).json({ recived: true });
});
